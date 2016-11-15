import {GlobalSettings} from './global-settings';
import {SerializationRule, defaultSerializationRule} from './serialization-rule';

abstract class Mock {
  public static readonly delimiter = '+';
  public static readonly prefix = 'testPrefix';
  public static readonly serializationRule: SerializationRule = {
    serialize: (source: any) => 'serialized',
    deserialize: (source: string) => ({name: 'Deserialized'})
  };
}

describe('Class: GlobalSettings', () => {
  const reset = () => {
    GlobalSettings.usePrefix(null);
    GlobalSettings.useDelimiter(':');
    GlobalSettings.useSerializationRule(null);
  };

  beforeEach(reset);
  afterAll(reset);

  it('should get default delimiter', () => {
    expect(GlobalSettings.delimiter).toEqual(':');
  });

  it('should get current delimiter', () => {
    (<any> GlobalSettings)._delimiter = Mock.delimiter;
    expect(GlobalSettings.delimiter).toEqual(Mock.delimiter);
  });

  it('should get current prefix', () => {
    (<any> GlobalSettings)._prefix = Mock.prefix;
    expect(GlobalSettings.prefix).toEqual(Mock.prefix);
  });

  it('should get default serialization rule', () => {
    expect(GlobalSettings.serializationRule).toEqual(defaultSerializationRule);
  });

  it('should get current serialization rule', () => {
    (<any> GlobalSettings)._rule = Mock.serializationRule;
    expect(GlobalSettings.serializationRule).toEqual(Mock.serializationRule);
  });

  it('should allow to set delimiter', () => {
    GlobalSettings.useDelimiter(Mock.delimiter);
    expect(GlobalSettings.delimiter).toEqual(Mock.delimiter);
  });

  it('should prevent setting null or undefined as delimiter', () => {
    GlobalSettings.useDelimiter(null);
    expect(GlobalSettings.delimiter).toEqual(':');
  });

  it('should allow to set prefix', () => {
    GlobalSettings.usePrefix(Mock.prefix);
    expect(GlobalSettings.prefix).toEqual(Mock.prefix);
  });

  it('should allow to set serialization rule', () => {
    GlobalSettings.useSerializationRule(Mock.serializationRule);
    expect(GlobalSettings.serializationRule).toEqual(Mock.serializationRule);
  });

  it('should prevent setting null or undefined as serializationRule', () => {
    GlobalSettings.useSerializationRule(null);
    expect(GlobalSettings.serializationRule).toEqual(defaultSerializationRule);
  });

  it('should inform of prefix existence', () => {
    expect(GlobalSettings.isPrefixSet).not.toBeTruthy();
    GlobalSettings.usePrefix(Mock.prefix);
    expect(GlobalSettings.isPrefixSet).toBeTruthy();
  });
});
