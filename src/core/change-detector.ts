import {NgZone} from '@angular/core';

export abstract class ChangeDetector {
  private static _callbacks: Function[];

  public static init(zone: NgZone): void {

  }

  public static register(callback: Function): void {

  }
}
