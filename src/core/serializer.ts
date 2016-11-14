import {SerializationRule} from './serialization-rule';

export interface Serializer {
  useSerializationRule(rule: SerializationRule): void;
}
