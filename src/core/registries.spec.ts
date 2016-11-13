import {Registry} from './registries';

abstract class Mock {
  public static readonly target = {name: 'Target'};
  public static readonly storage = window.localStorage;
  public static readonly value = 'testValue';
}

describe('Class: Registry', () => {
  let instance: Registry<string>;

  beforeEach(() => {
    instance = new Registry<string>();
  });

  it('should allow to set value mapped with instance and storage', () => {
    instance.set(Mock.target, Mock.storage, Mock.value);
    expect((<any> instance)._data.get(Mock.storage).get(Mock.target)).toEqual(Mock.value);
  });

  it('should get value mapped with instance and storage', () => {
    instance.set(Mock.target, Mock.storage, Mock.value);
    expect(instance.get(Mock.target, Mock.storage));
  });

  it('should inform of presence of value mapped with instance and storage in the registry', () => {
    expect(instance.has(Mock.target, Mock.storage)).not.toBeTruthy();
    instance.set(Mock.target, Mock.storage, Mock.value);
    expect(instance.has(Mock.target, Mock.storage)).toBeTruthy();
  });
});
