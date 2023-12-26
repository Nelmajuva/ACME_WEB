import { TestBed } from '@angular/core/testing';

import { BrandsOfVehiclesService } from './brands-of-vehicles.service';

describe('BrandsOfVehiclesService', () => {
  let service: BrandsOfVehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandsOfVehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
