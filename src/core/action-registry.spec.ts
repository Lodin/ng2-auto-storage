import {ActionRegistry} from './action-registry';

class Spy {
  public readonly action = jasmine.createSpy('action');
}

describe('Class: ActionRegistry', () => {
  let spy: Spy;
  let instance: ActionRegistry;

  beforeEach(() => {
    spy = new Spy();
    instance = new ActionRegistry();
  });

  it('should register new action', () => {
    instance.register(spy.action);
    expect((<any> instance)._list).toEqual([spy.action]);
  });

  it('should run all registered actions', () => {
    instance.register(spy.action);
    instance.register(spy.action);
    instance.register(spy.action);
    instance.run();

    expect(spy.action).toHaveBeenCalledTimes(3);
  });
});
