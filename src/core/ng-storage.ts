export interface NgStorage {
  keys: string[];
  has(key: string): boolean;
  get(key: string): any;
  set(key: string, value: any): void;
  remove(key: string): void;
}
