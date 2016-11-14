import {AdaptedKeyOperator} from './adapted-key-operator';
import {GlobalSettings} from '../global-settings';

abstract class Mock {
  public static readonly prefix = 'testPrefix';
  public static readonly globalPrefix = 'testGlobalPrefix';
  public static readonly key = 'testKey';
}

describe('Class: AdaptedKeyOperator', () => {
  let instance: AdaptedKeyOperator;

  beforeEach(() => {
    GlobalSettings.useDelimiter(':');
    instance = new AdaptedKeyOperator(Mock.prefix);
  });

  describe('finding out key belonging', () => {
    describe('if global prefix is not set', () => {
      it('should recognize key with local prefix for current target', () => {
        expect(instance.belongs(`${Mock.prefix}:${Mock.key}`)).toBeTruthy();
      });

      it('should reject any key that does not have local prefix', () => {
        expect(instance.belongs(Mock.key)).not.toBeTruthy();
        expect(instance.belongs(`${Mock.globalPrefix}:${Mock.key}`)).not.toBeTruthy();
        expect(instance.belongs(`${Mock.globalPrefix}:${Mock.prefix}:${Mock.key}`)).not.toBeTruthy();
      });
    });

    describe('if global prefix is set', () => {
      beforeEach(() => {
        GlobalSettings.usePrefix(Mock.globalPrefix);
      });
    });
  });

  describe('building key', () => {
    describe('if global prefix is not set', () => {
      it('should build key with only local prefix', () => {
        expect(instance.build(Mock.key)).toEqual(`${Mock.prefix}:${Mock.key}`);
      });
    });

    describe('if global prefix is set', () => {
      beforeEach(() => {
        GlobalSettings.usePrefix(Mock.globalPrefix);
      });

      it('should build key with global and local prefixes', () => {
        expect(instance.build(Mock.key)).toEqual(`${Mock.globalPrefix}:${Mock.prefix}:${Mock.key}`);
      });
    });
  });

  describe('stripping key', () => {
    it('should get key if key has no prefixes', () => {
      expect(instance.strip(Mock.key)).toEqual(Mock.key);
    });

    it('should get key if key has any single prefix', () => {
      expect(instance.strip(`${Mock.prefix}:${Mock.key}`)).toEqual(Mock.key);
      expect(instance.strip(`${Mock.globalPrefix}:${Mock.key}`)).toEqual(Mock.key);
    });

    it('should get key if key has many prefixes', () => {
      expect(instance.strip(`${Mock.globalPrefix}:${Mock.prefix}:${Mock.key}`));
    });
  });

  it('should work well with different delimiter', () => {
    GlobalSettings.useDelimiter('+');
    GlobalSettings.usePrefix(Mock.globalPrefix);

    const builtKey = `${Mock.globalPrefix}+${Mock.prefix}+${Mock.key}`;

    expect(instance.belongs(builtKey)).toBeTruthy();
    expect(instance.build(Mock.key)).toEqual(builtKey);
    expect(instance.strip(builtKey)).toEqual(Mock.key);
  });
});
