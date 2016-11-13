import {SerializationRule} from './serialization-rule';

export abstract class GlobalSettings {
  private static _prefix: string;
  private static _serializationRule: SerializationRule;

  public static get isPrefixSet(): boolean {
    return !!GlobalSettings._prefix;
  }

  public static get isSerializationRuleSet(): boolean {
    return !!GlobalSettings._serializationRule;
  }

  public static get prefix(): string {
    return GlobalSettings._prefix;
  }

  public static get serializationRule(): SerializationRule {
    return GlobalSettings._serializationRule;
  }

  public static setPrefix(prefix: string): void {
    GlobalSettings._prefix = prefix;
  }

  public static setSerializationRule(rule: SerializationRule): void {
    GlobalSettings._serializationRule = rule;
  }
}
