import { test } from '@jest/globals';
import assert from 'node:assert';
import { Observable } from 'multitude';

import { Consume } from '../src/Consume';

test(`Consume.result: null`, () => {
  const data = Consume.result(null);
  assert(data === null);
});
test(`Consume.result: success`, () => {
  const data = Consume.result({ success: true, data: 'foo' });

  assert(data === 'foo');
});
test(`Consume.result: failure`, () => {
  let thrown: any;
  try {
    Consume.result({ success: false, data: 'foo' });
  } catch (err) {
    thrown = err;
  }

  assert(thrown instanceof Error);
});
test(`Consume.result: Error failure`, () => {
  const error = new Error('foo');
  let thrown: any;
  try {
    Consume.result({ success: false, data: error });
  } catch (err) {
    thrown = err;
  }

  assert(thrown === error);
});
test(`Consume.result: failure, object w/ error throwing getter`, () => {
  const error = new Error('foo');
  let thrown: any;

  try {
    Consume.result({
      success: false,
      data: {
        get foo() {
          throw error;
        }
      }
    });
  } catch (err) {
    thrown = err;
  }

  assert(thrown !== error);
  assert(thrown instanceof Error);
});
test(`Consume.promise: null`, async () => {
  const data = Consume.promise(null);

  assert(data instanceof Promise);
  assert((await data) === null);
});
test(`Consume.promise: null promise`, async () => {
  const data = Consume.promise(Promise.resolve(null));

  assert(data instanceof Promise);
  assert((await data) === null);
});
test(`Consume.promise: success`, async () => {
  const data = Consume.promise({ success: true, data: 'foo' });

  assert(data instanceof Promise);
  assert((await data) === 'foo');
});
test(`Consume.promise: success promise`, async () => {
  const data = Consume.promise(Promise.resolve({ success: true, data: 'foo' }));

  assert(data instanceof Promise);
  assert((await data) === 'foo');
});
test(`Consume.promise: failure`, async () => {
  let thrown: any;
  let promise: any;
  try {
    promise = Consume.promise({ success: false, data: 'foo' });
    await promise;
  } catch (err) {
    thrown = err;
  }

  assert(thrown instanceof Error);
  assert(promise instanceof Promise);
});
test(`Consume.promise: failure promise`, async () => {
  let thrown: any;
  let promise: any;
  try {
    promise = Consume.promise(Promise.resolve({ success: false, data: 'foo' }));
    await promise;
  } catch (err) {
    thrown = err;
  }

  assert(thrown instanceof Error);
  assert(promise instanceof Promise);
});
test(`Consume.promise: Error failure`, async () => {
  const error = new Error('foo');

  let thrown: any;
  let promise: any;
  try {
    promise = Consume.promise({ success: false, data: error });
    await promise;
  } catch (err) {
    thrown = err;
  }

  assert(thrown === error);
  assert(promise instanceof Promise);
});
test(`Consume.promise: Error failure promise`, async () => {
  const error = new Error('foo');

  let thrown: any;
  let promise: any;
  try {
    promise = Consume.promise(Promise.resolve({ success: false, data: error }));
    await promise;
  } catch (err) {
    thrown = err;
  }

  assert(thrown === error);
  assert(promise instanceof Promise);
});
test(`Consume.observable: all successes case`, () => {
  const obs = new Observable((obs) => {
    obs.next({ success: true, data: 1 });
    obs.next({ success: true, data: 2 });
    obs.next({ success: true, data: 3 });
    obs.next({ success: true, data: 4 });
    obs.next({ success: true, data: 5 });
    obs.complete();
  });

  const values: any[] = [];
  const times = [0, 0, 0];
  Consume.observable(Observable, obs).subscribe({
    next(value) {
      times[0]++;
      values.push(value);
    },
    error: () => times[1]++,
    complete: () => times[2]++
  });

  assert.deepStrictEqual(times, [5, 0, 1]);
  assert.deepStrictEqual(values, [1, 2, 3, 4, 5]);
});
test(`Consume.observable: eventual failure case`, () => {
  const obs = new Observable((obs) => {
    obs.next({ success: true, data: 1 });
    obs.next({ success: true, data: 2 });
    obs.next({ success: false, data: 3 });
    obs.next({ success: true, data: 4 });
    obs.next({ success: true, data: 5 });
    obs.complete();
  });

  let reason: any;
  const values: any[] = [];
  const times = [0, 0, 0];
  Consume.observable(Observable, obs).subscribe({
    next(value) {
      times[0]++;
      values.push(value);
    },
    error(err) {
      times[1]++;
      reason = err;
    },
    complete: () => times[2]++
  });

  assert(reason instanceof Error);
  assert.deepStrictEqual(times, [2, 1, 0]);
  assert.deepStrictEqual(values, [1, 2]);
});
test(`Consume.observable: eventual Error failure case`, () => {
  const error = new Error('foo');
  const obs = new Observable((obs) => {
    obs.next({ success: true, data: 1 });
    obs.next({ success: true, data: 2 });
    obs.next({ success: false, data: error });
    obs.next({ success: true, data: 4 });
    obs.next({ success: true, data: 5 });
    obs.complete();
  });

  let reason: any;
  const values: any[] = [];
  const times = [0, 0, 0];
  Consume.observable(Observable, obs).subscribe({
    next(value) {
      times[0]++;
      values.push(value);
    },
    error(err) {
      times[1]++;
      reason = err;
    },
    complete: () => times[2]++
  });

  assert(reason === error);
  assert.deepStrictEqual(times, [2, 1, 0]);
  assert.deepStrictEqual(values, [1, 2]);
});
test(`Consume.observable: relays errors`, () => {
  const error = new Error('foo');
  const obs = new Observable((obs) => {
    obs.error(error);
    obs.next({ success: true, data: 1 });
    obs.complete();
  });

  let reason: any;
  const times = [0, 0, 0];
  Consume.observable(Observable, obs).subscribe({
    next: () => times[0]++,
    error(err) {
      times[1]++;
      reason = err;
    },
    complete: () => times[2]++
  });

  assert(reason === error);
  assert.deepStrictEqual(times, [0, 1, 0]);
});
