export class KeyBuilder {
  constructor(private _target: any,
              private _storage: Storage) {
  }

  public belongs(key: string): boolean {
    return false;
  }

  public build(key: string): string {
    return '';
  }

  public strip(key: string): string {
    return '';
  }
}
