import {GlobalSettings} from './global-settings';

abstract class Mock {
  public static readonly prefix = 'testPrefix';
  public static readonly serializationRule = {
    serialize: (deserialized: any) => 'serialized',
    deserialize: (serialized: string) => ({name: 'Deserialized'})
  };
}

describe('Abstract class: GlobalSettings', () => {
  afterEach(() => {
    GlobalSettings.setPrefix(null);
    GlobalSettings.setSerializationRule(null);
  });

  it('should get preset prefix', () => {
    (<any> GlobalSettings)._prefix = Mock.prefix;
    expect(GlobalSettings.prefix).toEqual(Mock.prefix);
  });

  it('should get preset serialization rule', () => {
    (<any> GlobalSettings)._serializationRule = Mock.serializationRule;
    expect(GlobalSettings.serializationRule).toEqual(Mock.serializationRule);
  });

  it('should allow to set prefix', () => {
    GlobalSettings.setPrefix(Mock.prefix);
    expect(GlobalSettings.prefix).toEqual(Mock.prefix);
  });

  it('should allow to set serialization rule', () => {
    GlobalSettings.setSerializationRule(Mock.serializationRule);
    expect(GlobalSettings.serializationRule).toEqual(Mock.serializationRule);
  });

  it('should inform of prefix existence', () => {
    expect(GlobalSettings.isPrefixSet).not.toBeTruthy();
    GlobalSettings.setPrefix(Mock.prefix);
    expect(GlobalSettings.isPrefixSet).toBeTruthy();
  });

  it('should inform of serialization rule existence', () => {
    expect(GlobalSettings.isSerializationRuleSet).not.toBeTruthy();
    GlobalSettings.setSerializationRule(Mock.serializationRule);
    expect(GlobalSettings.isSerializationRuleSet).toBeTruthy();
  });
});
