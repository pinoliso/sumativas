import { TestBed } from '@angular/core/testing';

import { EventBoreadcastService } from './event-boreadcast.service';

describe('EventBoreadcastService', () => {
  let service: EventBoreadcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventBoreadcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
