import {KeyOperatorRegistry} from './.';
import {PropertyRegistry} from './property-registry';

abstract class Mock {
  public static readonly target = {name: 'Target', _test_local_mapped: 1};
  public static readonly key = 'testKey';
  public static readonly property = 'testProperty';
  public static readonly storage = window.localStorage;
}

class Spy {
  public readonly keyOperatorRegistry = {
    get: spyOn(KeyOperatorRegistry, 'get')
  };

  public readonly storage = {
    getItem: spyOn(Mock.storage, 'getItem'),
    setItem: spyOn(Mock.storage, 'setItem')
  };

  public readonly options = {
    key: Mock.key,
    serialize: jasmine.createSpy('SerializationRule#serialize'),
    deserialize: jasmine.createSpy('SerializationRule#deserialize')
  };
}

describe('Class: PropertyRegistry', () => {
  let spy: Spy;

  beforeEach(() => {
    spy = new Spy();
  });

  afterAll(() => {
    this.keyOperatorRegistry.get.and.callThrough();
  });

  describe('if property is not stored yet', () => {
    xit('should initialize property ', () => {
      this.storage.getItem.and.returnValue(null);

    });
  });
});
