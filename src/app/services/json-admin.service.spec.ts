import { TestBed } from '@angular/core/testing';

import { JsonAdminService } from './json-admin.service';

describe('JsonAdminService', () => {
  let service: JsonAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
