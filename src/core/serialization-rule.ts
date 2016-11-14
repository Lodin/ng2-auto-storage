export type SerializationRule = {
  serialize: (source: any) => string;
  deserialize: (source: string) => any;
}
