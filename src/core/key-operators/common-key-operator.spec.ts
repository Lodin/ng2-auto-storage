import {GlobalSettings} from '../global-settings';
import {CommonKeyOperator} from './common-key-operator';

abstract class Mock {
  public static readonly key = 'testKey';
  public static readonly prefix = 'testPrefix';
  public static readonly globalPrefix = 'testGlobalPrefix';
}

describe('Class: CommonKeyOperator', () => {
  beforeEach(() => {
    GlobalSettings.usePrefix(null);
    GlobalSettings.useDelimiter(':');
  });

  describe('finding out key belonging', () => {
    describe('if global prefix is not set', () => {
      it('should recognize any storage key without prefix', () => {
        expect(CommonKeyOperator.belongs(Mock.key)).toBeTruthy();
        expect(CommonKeyOperator.belongs(`${Mock.prefix}:${Mock.key}`)).not.toBeTruthy();
      });
    });

    describe('if global prefix is set', () => {
      beforeEach(() => {
        GlobalSettings.usePrefix(Mock.globalPrefix);
      });

      it(' should recognize keys with global prefix', () => {
        expect(CommonKeyOperator.belongs(Mock.key)).not.toBeTruthy();
        expect(CommonKeyOperator.belongs(`${Mock.prefix}:${Mock.key}`)).not.toBeTruthy();
        expect(CommonKeyOperator.belongs(`${Mock.globalPrefix}:${Mock.prefix}:${Mock.key}`))
          .not.toBeTruthy();
        expect(CommonKeyOperator.belongs(`${Mock.globalPrefix}:${Mock.key}`)).toBeTruthy();
      });
    });
  });

  describe('building key', () => {
    describe('if global prefix is not set', () => {
      it('should get received key', () => {
        expect(CommonKeyOperator.build(Mock.key)).toEqual(Mock.key);
      });
    });

    describe('if global prefix is set', () => {
      beforeEach(() => {
        GlobalSettings.usePrefix(Mock.globalPrefix);
      });

      it('should get key with global prefix', () => {
        expect(CommonKeyOperator.build(Mock.key)).toEqual(`${Mock.globalPrefix}:${Mock.key}`);
      });
    });
  });

  describe('stripping key', () => {
    it('should get key if key has no prefixes', () => {
      expect(CommonKeyOperator.strip(Mock.key)).toEqual(Mock.key);
    });

    it('should get key if key has any single prefix', () => {
      expect(CommonKeyOperator.strip(`${Mock.prefix}:${Mock.key}`)).toEqual(Mock.key);
      expect(CommonKeyOperator.strip(`${Mock.globalPrefix}:${Mock.key}`)).toEqual(Mock.key);
    });

    it('should get key if key has many prefixes', () => {
      expect(CommonKeyOperator.strip(`${Mock.globalPrefix}:${Mock.prefix}:${Mock.key}`));
    });
  });

  it('should work well with different delimiters', () => {
    GlobalSettings.useDelimiter('+');
    GlobalSettings.usePrefix(Mock.globalPrefix);

    const builtKey = `${Mock.globalPrefix}+${Mock.key}`;
    expect(CommonKeyOperator.belongs(builtKey)).toBeTruthy();
    expect(CommonKeyOperator.build(Mock.key)).toEqual(builtKey);
    expect(CommonKeyOperator.strip(builtKey)).toEqual(Mock.key);
  });
});
