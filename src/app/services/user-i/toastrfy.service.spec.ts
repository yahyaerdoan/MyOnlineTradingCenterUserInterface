import { TestBed } from '@angular/core/testing';

import { ToastrfyService } from './toastrfy.service';

describe('ToastrfyService', () => {
  let service: ToastrfyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrfyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
