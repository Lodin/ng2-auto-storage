import {StorageService} from './storage-service';

abstract class Mock {
  public static readonly zone = {name: 'Zone'};
  public static readonly storage = window.localStorage;
}

describe('Class: StorageService', () => {
  let instance: StorageService;

  beforeEach(() => {
    instance = new StorageService(Mock.storage, <any> Mock.zone);
  });

  xit('should create operator and start change detection for instance', () => {

  });
});
