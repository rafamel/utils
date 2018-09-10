const aslug = require('../src');

describe(`- Basic`, () => {
  test(`Works when opts are provided`, () => {
    const ans = aslug('some|str', {
      target: /[^a-zA-Z0-9]/,
      separation: '_',
      trim: false,
      replace: (char) => char.charCodeAt()
    });
    expect(ans).toBe('some_124_str');
  });
  test(`Defaults`, () => {
    const ans = aslug('some|str');
    expect(ans).toBe('some_124_str');
  });
});

describe(`- Edge`, () => {
  test(`Target at beginning (no trim)`, () => {
    const ans = aslug('|some|str');
    expect(ans).toBe('_124_some_124_str');
  });
  test(`Target at end (no trim)`, () => {
    const ans = aslug('some|str|');
    expect(ans).toBe('some_124_str_124_');
  });
});

describe(`- Target`, () => {
  test(`Changed target works`, () => {
    const ans = aslug('sOme|sTr', { target: /[^a-z]/ });
    expect(ans).toBe('s_79_me_124_s_84_r');
  });
});

describe(`- Separation`, () => {
  test(`Works`, () => {
    const ans = aslug('some|str', { separation: '+' });
    expect(ans).toBe('some+124+str');
  });
  test(`Works when colliding (1)`, () => {
    const ans = aslug('some|str', { separation: '1' });
    expect(ans).toBe('some11241str');
  });
  test(`Works when colliding (2)`, () => {
    const ans = aslug('some_str', { separation: '_' });
    expect(ans).toBe('some_95_str');
  });
  test(`No separation`, () => {
    const ans = aslug('some|str', { separation: '' });
    expect(ans).toBe('some124str');
  });
});

describe(`- Trim`, () => {
  test(`Target at beginning (no trim)`, () => {
    const ans = aslug('|some|str', { trim: false });
    expect(ans).toBe('_124_some_124_str');
  });
  test(`Target at end (no trim)`, () => {
    const ans = aslug('some|str|', { trim: false });
    expect(ans).toBe('some_124_str_124_');
  });
  test(`Target at beginning (trim)`, () => {
    const ans = aslug('|some|str', { trim: true });
    expect(ans).toBe('124_some_124_str');
  });
  test(`Target at end (trim)`, () => {
    const ans = aslug('some|str|', { trim: true });
    expect(ans).toBe('some_124_str_124');
  });
});

describe(`- Replace`, () => {
  test(`Works`, () => {
    const ans = aslug('some|str', { replace: (x) => `chant${x}chant` });
    expect(ans).toBe('some_chant|chant_str');
  });
  test(`No replace`, () => {
    const ans = aslug('some||str', {
      replace: () => ''
    });
    expect(ans).toBe('some____str');
  });
  test(`No replace, no separation`, () => {
    const ans = aslug('some||str||', {
      separation: '',
      replace: () => ''
    });
    expect(ans).toBe('somestr');
  });
});
