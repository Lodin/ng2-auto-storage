import {GlobalSettings} from './global-settings';
import {PrefixRegistry} from './registries';
import {KeyBuilder} from './key-builder';

abstract class Mock {
  public static readonly globalPrefix = 'testGlobalPrefix';
  public static readonly key = 'testKey';
  public static readonly prefix = 'testPrefix';
  public static readonly anotherPrefix = 'testAnotherPrefix';
  public static readonly storage = {name: 'Storage'};
  public static readonly target = {name: 'Target'};
}

class Spy {
  public readonly prefixRegistry = {
    has: spyOn(PrefixRegistry, 'has'),
    get: spyOn(PrefixRegistry, 'get')
  };
}

describe('Class: KeyBuilder', () => {
  let spy: Spy;
  let instance: KeyBuilder;

  beforeEach(() => {
    spy = new Spy();
  });

  afterEach(() => {
    GlobalSettings.setPrefix(null);
  });

  it('should inform of being adapted', () => {
    spy.prefixRegistry.has.and.returnValue(true);

    instance = new KeyBuilder(<any> Mock.storage);
    expect(instance.isAdapted).not.toBeTruthy();
    expect(spy.prefixRegistry.has).not.toHaveBeenCalled();

    instance = new KeyBuilder(<any> Mock.storage, Mock.target);
    expect(instance.isAdapted).toBeTruthy();
    expect(spy.prefixRegistry.has).toHaveBeenCalled();
  });

  describe('finding out key belonging', () => {
    describe('if key builder is initialized without target', () => {
      beforeEach(() => {
        instance = new KeyBuilder(<any> Mock.storage);

        spy.prefixRegistry.has.and.returnValue(false);
      });

      it('should get false on any key', () => {
        expect(instance.belongs(Mock.key)).not.toBeTruthy();
        expect(instance.belongs(`${Mock.globalPrefix}:${Mock.key}`)).not.toBeTruthy();
        expect(instance.belongs(`${Mock.prefix}:${Mock.key}`)).not.toBeTruthy();
        expect(instance.belongs(`${Mock.globalPrefix}:${Mock.prefix}:${Mock.key}`))
          .not.toBeTruthy();
      });
    });

    describe('if key builder is initialized with target', () => {
      beforeEach(() => {
        instance = new KeyBuilder(<any> Mock.storage, Mock.target);

        spy.prefixRegistry.has.and.returnValue(true);
        spy.prefixRegistry.get.and.returnValue(Mock.prefix);
      });

      it('should get true if key has a correct prefix', () => {
        expect(instance.belongs(`${Mock.prefix}:${Mock.key}`)).toBeTruthy();
        expect(instance.belongs(`${Mock.globalPrefix}:${Mock.prefix}:${Mock.key}`)).toBeTruthy();
      });

      it('should get false if key has no prefix', () => {
        expect(instance.belongs(Mock.key)).not.toBeTruthy();
      });

      it('should get false if key has no correct prefix', () => {
        expect(instance.belongs(`${Mock.anotherPrefix}:${Mock.key}`)).not.toBeTruthy();
        expect(instance.belongs(`${Mock.globalPrefix}:${Mock.anotherPrefix}:${Mock.key}`))
          .not.toBeTruthy();
      });
    });
  });

  describe('building a key', () => {
    describe('if there is no global prefix', () => {
      it('should get received key if key builder is initialized without target', () => {
        instance = new KeyBuilder(<any> Mock.storage);

        spy.prefixRegistry.has.and.returnValue(false);

        expect(instance.build(Mock.key)).toEqual(Mock.key);
      });

      it('should get key with prefix if key builder is initialized with target', () => {
        instance = new KeyBuilder(<any> Mock.storage, Mock.target);

        spy.prefixRegistry.has.and.returnValue(true);
        spy.prefixRegistry.get.and.returnValue(Mock.prefix);

        expect(instance.build(Mock.key)).toEqual(`${Mock.prefix}:${Mock.key}`);
        expect(spy.prefixRegistry.get).toHaveBeenCalledWith(Mock.target, Mock.storage);
      });
    });

    describe('if there is a global prefix', () => {
      beforeEach(() => {
        GlobalSettings.setPrefix(Mock.globalPrefix);
      });

      it('should get key with global prefix if key builder is initialized without target', () => {
        instance = new KeyBuilder(<any> Mock.storage);

        spy.prefixRegistry.has.and.returnValue(false);

        expect(instance.build(Mock.key)).toEqual(`${Mock.globalPrefix}:${Mock.key}`);
      });

      it('should get key with global and local prefixes if key builder is initialized with ' +
        'target', () => {
        instance = new KeyBuilder(<any> Mock.storage, Mock.target);

        spy.prefixRegistry.has.and.returnValue(true);
        spy.prefixRegistry.get.and.returnValue(Mock.prefix);

        expect(instance.build(Mock.key)).toEqual(`${Mock.globalPrefix}:${Mock.prefix}:${Mock.key}`);
      });
    });
  });

  describe('stripping a key', () => {
    describe('if there is no global prefix', () => {
      describe('and if key builder is initialized without target', () => {
        beforeEach(() => {
          instance = new KeyBuilder(<any> Mock.storage);

          spy.prefixRegistry.has.and.returnValue(false);
        });

        it('should get received key as is if key has no prefixes', () => {
          expect(instance.strip(Mock.key)).toEqual(Mock.key);
        });

        it('should return null if key has prefixes', () => {
          expect(instance.strip(`${Mock.prefix}:${Mock.key}`)).toBeNull();
        });
      });

      describe('and if key builder is initialized with target', () => {
        beforeEach(() => {
          instance = new KeyBuilder(<any> Mock.storage, Mock.target);

          spy.prefixRegistry.has.and.returnValue(true);
          spy.prefixRegistry.get.and.returnValue(Mock.prefix);
        });

        it('should get stripped key if received key has correct prefix', () => {
          expect(instance.strip(`${Mock.prefix}:${Mock.key}`)).toEqual(Mock.key);
        });

        it('should return null if received key has incorrect prefix', () => {
          expect(instance.strip(`${Mock.globalPrefix}:${Mock.key}`)).toBeNull();
        });

        it('should return null if received key has no prefixes', () => {
          expect(instance.strip(Mock.key)).toBeNull();
        });
      });
    });

    describe('if there is a global prefix', () => {
      beforeEach(() => {
        GlobalSettings.setPrefix(Mock.globalPrefix);
      });

      describe('and if key builder is initialized without target', () => {
        beforeEach(() => {
          instance = new KeyBuilder(<any> Mock.storage);

          spy.prefixRegistry.has.and.returnValue(false);
        });

        it('should get stripped key if received key has global prefix', () => {
          expect(instance.strip(`${Mock.globalPrefix}:${Mock.key}`)).toEqual(Mock.key);
        });

        it('should return null if received key has no prefixes', () => {
          expect(instance.strip(Mock.key)).toBeNull();
        });
      });

      describe('and if key builder is initialized with target', () => {
        beforeEach(() => {
          instance = new KeyBuilder(<any> Mock.storage, Mock.target);

          spy.prefixRegistry.has.and.returnValue(true);
          spy.prefixRegistry.get.and.returnValue(Mock.prefix);
        });

        it('should get stripped key if received key has global and local prefixes', () => {
          expect(instance.strip(`${Mock.globalPrefix}:${Mock.prefix}:${Mock.key}`))
            .toEqual(Mock.key);
        });

        it('should return null if received key does not have all prefixes', () => {
          expect(instance.strip(`${Mock.globalPrefix}:${Mock.key}`)).toBeNull();
          expect(instance.strip(`${Mock.prefix}:${Mock.key}`)).toBeNull();
        });

        it('should return null if received key has incorrect prefixes', () => {
          expect(instance.strip(`${Mock.globalPrefix}:${Mock.globalPrefix}:${Mock.key}`))
            .toBeNull();
          expect(instance.strip(`${Mock.prefix}:${Mock.prefix}:${Mock.key}`)).toBeNull();
        });
      });
    });
  });
});
