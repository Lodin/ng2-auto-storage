import KeyOperatorRegistry from './key-operator-registry';

abstract class Mock {
  public static readonly target = {name: 'Target'};
  public static readonly storage = window.localStorage;
  public static readonly value = {name: 'StorageOperator'};
}

describe('Class: KeyOperatorRegistry', () => {
  const reset = () => (<any> KeyOperatorRegistry)._data.get(Mock.storage).clear();
  beforeEach(reset);
  afterAll(reset);

  it('should allow to set value mapped with KeyOperatorRegistry and storage', () => {
    KeyOperatorRegistry.set(Mock.target, Mock.storage, <any> Mock.value);
    expect((<any> KeyOperatorRegistry)._data.get(Mock.storage).get(Mock.target)).toEqual(Mock.value);
  });

  it('should get value mapped with KeyOperatorRegistry and storage', () => {
    KeyOperatorRegistry.set(Mock.target, Mock.storage, <any> Mock.value);
    expect(KeyOperatorRegistry.get(Mock.target, Mock.storage));
  });

  it('should inform of presence of value mapped with KeyOperatorRegistry and storage in the registry', () => {
    expect(KeyOperatorRegistry.has(Mock.target, Mock.storage)).not.toBeTruthy();
    KeyOperatorRegistry.set(Mock.target, Mock.storage, <any> Mock.value);
    expect(KeyOperatorRegistry.has(Mock.target, Mock.storage)).toBeTruthy();
  });
});
