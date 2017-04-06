import {StorageOperator} from './storage-operator';
import {GlobalSettings} from './global-settings';

abstract class Mock {
  public static readonly prefix = 'testPrefix';
  public static readonly globalPrefix = 'testGlobalPrefix';
  public static readonly key = 'testKey';
  public static readonly anotherKey = 'testAnotherKey';
  public static readonly item = {name: 'Item'};
}

class Spy {
  public readonly storage = {
    length: 2,
    getItem: jasmine.createSpy('Storage#getItem'),
    key: jasmine.createSpy('Storage#key'),
    removeItem: jasmine.createSpy('Storage#removeItem'),
    setItem: jasmine.createSpy('Storage#setItem')
  };

  public readonly keyOperator = {
    belongs: jasmine.createSpy('AdaptedKeyOperator#belongs'),
    build: jasmine.createSpy('AdaptedKeyOperator#build'),
    strip: jasmine.createSpy('AdaptedKeyOperator#strip')
  };
}

describe('Class: StorageOperator', () => {
  let spy: Spy;
  let instance: StorageOperator;

  beforeEach(() => {
    spy = new Spy();
    instance = new StorageOperator(<any> spy.storage, <any> spy.keyOperator);
  });

  it('should have default serialization rule', () => {
    expect((<any> instance)._serializer).toEqual({
      serialize: JSON.stringify,
      deserialize: JSON.parse
    });
  });

  it('should get all storage keys belonging to this target', () => {
    spy.storage.key.and.returnValues(`${Mock.prefix}:${Mock.key}`, Mock.anotherKey);
    spy.keyOperator.belongs.and.returnValues(true, false);
    spy.keyOperator.strip.and.returnValue(Mock.key);

    expect(instance.keys).toEqual([Mock.key]);
    expect(spy.storage.key).toHaveBeenCalledTimes(2);
    expect(spy.keyOperator.belongs).toHaveBeenCalledWith(`${Mock.prefix}:${Mock.key}`);
    expect(spy.keyOperator.belongs).toHaveBeenCalledWith(Mock.anotherKey);
    expect(spy.keyOperator.strip).toHaveBeenCalledWith(`${Mock.prefix}:${Mock.key}`);
  });

  it('should set serialization rule', () => {
    const rule = {
      serialize: (source: any) => JSON.stringify(Object.assign({}, source, {attribute: 'Test'})),
      deserialize: (source: string) => JSON.parse(source)
    };

    instance.useSerializationRule(rule);
    expect((<any> instance)._serializer).toEqual(rule);
  });

  it('should prevent setting empty serialization rule', () => {
    instance.useSerializationRule(null);
    expect((<any> instance)._serializer).toEqual(GlobalSettings.serializationRule);
  });

  describe('basically', () => {
    let builtKey: string;

    beforeEach(() => {
      builtKey = `${Mock.prefix}:${Mock.key}`;

      spy.keyOperator.build.and.returnValue(builtKey);
      spy.storage.getItem.and.returnValues(JSON.stringify(Mock.item), undefined);
    });

    afterEach(() => {
      expect(spy.keyOperator.build).toHaveBeenCalledWith(Mock.key);
    });

    it('should get deserialized storage item by key', () => {
      expect(instance.get(Mock.key)).toEqual(Mock.item);
      expect(spy.storage.getItem).toHaveBeenCalledWith(builtKey);
    });

    it('should set storage item by key', () => {
      instance.set(Mock.key, Mock.item);
      expect(spy.storage.setItem).toHaveBeenCalledWith(builtKey, JSON.stringify(Mock.item));
    });

    it('should inform of key existence in storage', () => {
      expect(instance.has(Mock.key)).toBeTruthy();
      expect(spy.storage.getItem).toHaveBeenCalledWith(builtKey);

      expect(instance.has(Mock.key)).not.toBeTruthy();
    });

    it('should remove storage item by key', () => {
      instance.remove(Mock.key);
      expect(spy.storage.removeItem).toHaveBeenCalledWith(builtKey);
    });
  });
});
