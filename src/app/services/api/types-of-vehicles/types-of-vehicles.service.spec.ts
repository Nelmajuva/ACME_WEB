import { TestBed } from '@angular/core/testing';

import { TypesOfVehiclesService } from './types-of-vehicles.service';

describe('TypesOfVehiclesService', () => {
  let service: TypesOfVehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesOfVehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
