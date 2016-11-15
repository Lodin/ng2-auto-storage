export type SerializationRule = {
  serialize: (source: any) => string;
  deserialize: (source: string) => any;
}

export const defaultSerializationRule: SerializationRule = {
  serialize: JSON.stringify,
  deserialize: JSON.parse
};
