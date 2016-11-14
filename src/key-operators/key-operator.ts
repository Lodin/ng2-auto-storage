export interface KeyOperator {
  belongs(key: string): boolean;
  build(key: string): string;
  strip(key: string): string;
}
