const { default: State } = require('../src/state');

describe('State', () => {
  let state = new State();

  afterAll(() => {
    state = new State();
  });

  it('should have a default getter soundOn set to true', () => {
    expect(state.soundOn).toStrictEqual(true);
  });

  it('should have a default setter soundOn where we can change the value', () => {
    state.soundOn = 'x';
    expect(state.soundOn).toStrictEqual('x');
  });

  it('should have a default getter navWidth set to 180', () => {
    expect(state.navWidth).toStrictEqual(180);
  });

  it('should have a default setter navWidth where we can change the value', () => {
    state.navWidth = 'x';
    expect(state.navWidth).toStrictEqual('x');
  });

  it('should have a default getter nickname set to unnamed', () => {
    expect(state.nickname).toStrictEqual('unnamed');
  });

  it('should have a default setter nickname where we can change the value', () => {
    state.nickname = 'x';
    expect(state.nickname).toStrictEqual('x');
  });

  it('you can add other variables trough direct assignment', () => {
    state.newVariable = 'x';
    expect(state.newVariable).toStrictEqual('x');
  });
});
