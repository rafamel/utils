import { Create } from '../src/Create';
import { Observable } from 'multitude';
import assert from 'assert';

test(`Create.success`, () => {
  const result = Create.success('foo');
  assert.deepStrictEqual(result, { success: true, data: 'foo' });
});
test(`Create.failure`, () => {
  const result = Create.failure('foo');
  assert.deepStrictEqual(result, { success: false, data: 'foo' });
});
test(`Create.execute: success`, () => {
  const result = Create.execute(() => 'foo');
  assert.deepStrictEqual(result, { success: true, data: 'foo' });
});
test(`Create.execute: failure`, () => {
  const err = Error('foo');
  const result = Create.execute(() => {
    throw err;
  });
  assert.deepStrictEqual(result, { success: false, data: err });
});
test(`Create.promise: value`, async () => {
  const result = Create.promise('foo');

  assert(result instanceof Promise);
  assert.deepStrictEqual(await result, { success: true, data: 'foo' });
});
test(`Create.promise: promise resolution`, async () => {
  const result = Create.promise(Promise.resolve('foo'));

  assert(result instanceof Promise);
  assert.deepStrictEqual(await result, { success: true, data: 'foo' });
});
test(`Create.promise: promise rejection`, async () => {
  const err = Error('foo');
  const result = Create.promise(Promise.reject(err));

  assert(result instanceof Promise);
  assert.deepStrictEqual(await result, { success: false, data: err });
});
test(`Create.promise: sync function value`, async () => {
  const result = Create.promise(() => 'foo');

  assert(result instanceof Promise);
  assert.deepStrictEqual(await result, { success: true, data: 'foo' });
});
test(`Create.promise: sync function exception`, async () => {
  const err = Error('foo');
  const result = Create.promise(() => {
    throw err;
  });

  assert(result instanceof Promise);
  assert.deepStrictEqual(await result, { success: false, data: err });
});
test(`Create.promise: async function resolution`, async () => {
  const result = Create.promise(async () => 'foo');

  assert(result instanceof Promise);
  assert.deepStrictEqual(await result, { success: true, data: 'foo' });
});
test(`Create.promise: async function rejection`, async () => {
  const err = Error('foo');
  const result = Create.promise(() => Promise.reject(err));

  assert(result instanceof Promise);
  assert.deepStrictEqual(await result, { success: false, data: err });
});
test(`Create.observable: observable completes case`, () => {
  const obs = Observable.from([1, 2, 3, 4, 5]);

  const resultObs = Create.observable(Observable, obs);

  const values: any[] = [];
  const times = [0, 0, 0];
  resultObs.subscribe({
    next(value) {
      times[0]++;
      values.push(value);
    },
    error: () => times[1]++,
    complete: () => times[2]++
  });

  assert.deepStrictEqual(times, [5, 0, 1]);
  assert.deepStrictEqual(values, [
    { success: true, data: 1 },
    { success: true, data: 2 },
    { success: true, data: 3 },
    { success: true, data: 4 },
    { success: true, data: 5 }
  ]);
});
test(`Create.observable: observable errors case, no completeOnFail`, () => {
  const error = Error('foo');
  const obs = new Observable((obs) => {
    obs.next(1);
    obs.next(2);
    obs.error(error);
  });

  const resultObs = Create.observable(Observable, obs);

  const values: any[] = [];
  const times = [0, 0, 0];
  resultObs.subscribe({
    next(value) {
      times[0]++;
      values.push(value);
    },
    error: () => times[1]++,
    complete: () => times[2]++
  });

  assert.deepStrictEqual(times, [3, 0, 0]);
  assert.deepStrictEqual(values, [
    { success: true, data: 1 },
    { success: true, data: 2 },
    { success: false, data: error }
  ]);
});
test(`Create.observable: observable errors case, completeOnFail`, () => {
  const error = Error('foo');
  const obs = new Observable((obs) => {
    obs.next(1);
    obs.next(2);
    obs.error(error);
  });

  const resultObs = Create.observable(Observable, obs, true);

  const values: any[] = [];
  const times = [0, 0, 0];
  resultObs.subscribe({
    next(value) {
      times[0]++;
      values.push(value);
    },
    error: () => times[1]++,
    complete: () => times[2]++
  });

  assert.deepStrictEqual(times, [3, 0, 1]);
  assert.deepStrictEqual(values, [
    { success: true, data: 1 },
    { success: true, data: 2 },
    { success: false, data: error }
  ]);
});
test(`Create.combine: success array`, () => {
  const result = Create.combine([
    { success: true, data: 1 },
    { success: true, data: 2 },
    { success: true, data: 3 },
    { success: true, data: 4 },
    { success: true, data: 5 }
  ]);

  assert.deepStrictEqual(result, { success: true, data: [1, 2, 3, 4, 5] });
});
test(`Create.combine: failure array`, () => {
  const result = Create.combine([
    { success: true, data: 1 },
    null,
    { success: false, data: 3 },
    { success: true, data: 4 },
    { success: true, data: 5 }
  ]);

  assert.deepStrictEqual(result, { success: false, data: 3 });
});
test(`Create.combine: array with null`, () => {
  const result = Create.combine([
    { success: true, data: 1 },
    { success: true, data: 2 },
    null,
    { success: true, data: 4 },
    { success: true, data: 5 }
  ]);

  assert(result === null);
});
test(`Create.combine: success record`, () => {
  const result = Create.combine({
    a: { success: true, data: 1 },
    b: { success: true, data: 2 },
    c: { success: true, data: 3 },
    d: { success: true, data: 4 },
    e: { success: true, data: 5 }
  });

  assert.deepStrictEqual(result, {
    success: true,
    data: { a: 1, b: 2, c: 3, d: 4, e: 5 }
  });
});
test(`Create.combine: failure record`, () => {
  const result = Create.combine({
    a: { success: true, data: 1 },
    b: null,
    c: { success: false, data: 3 },
    d: { success: true, data: 4 },
    e: { success: true, data: 5 }
  });

  assert.deepStrictEqual(result, { success: false, data: 3 });
});
test(`Create.combine: record with null`, () => {
  const result = Create.combine({
    a: { success: true, data: 1 },
    b: null,
    c: { success: true, data: 3 },
    d: { success: true, data: 4 },
    e: { success: true, data: 5 }
  });

  assert.deepStrictEqual(result, null);
});
