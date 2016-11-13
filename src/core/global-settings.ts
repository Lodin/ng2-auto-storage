import {SerializationRule} from './serialization-rule';

export abstract class GlobalSettings {
  public static prefix: string;
  public static serializationRule: SerializationRule;
}
