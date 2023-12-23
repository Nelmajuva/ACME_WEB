import { TestBed } from '@angular/core/testing';

import { MotorsOfVehiclesService } from './motors-of-vehicles.service';

describe('MotorsOfVehiclesService', () => {
  let service: MotorsOfVehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotorsOfVehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
