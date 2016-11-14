import {Serializer} from './serializer';
import {SerializationRule} from './serialization-rule';

export const GlobalSettings = new (class GlobalSettings implements Serializer {
  private _delimiter = ':';
  private _prefix: string;
  private _rule: SerializationRule;

  public get delimiter(): string {
    return this._delimiter;
  }

  public get isPrefixSet(): boolean {
    return !!this._prefix;
  }

  public get isSerializationRuleSet(): boolean {
    return !!this._rule;
  }

  public get prefix(): string {
    return this._prefix;
  }

  public get serializationRule(): SerializationRule {
    return this._rule;
  }

  public useDelimiter(delimiter: string): void {
    this._delimiter = delimiter ? delimiter : ':';
  }

  public useSerializationRule(rule: SerializationRule) {
    this._rule = rule;
  }

  public usePrefix(prefix: string): void {
    this._prefix = prefix;
  }
})();
