import { TestBed } from '@angular/core/testing';

import { TypesOfAccountsService } from './types-of-accounts.service';

describe('TypesOfAccountsService', () => {
  let service: TypesOfAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesOfAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
