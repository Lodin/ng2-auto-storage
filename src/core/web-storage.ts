export type WebStorage = {
  key?: string;
  serialize?: (source: any) => string;
  deserialize?: (source: string) => any;
};
