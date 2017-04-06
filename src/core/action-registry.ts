export class ActionRegistry {
  private _list: Function[] = [];

  public register(action: Function): void {
    this._list.push(action);
  }

  public run(): void {
    for (const action of this._list) {
      action();
    }
  }
}
