import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsInDatabaseComponent } from './stats-in-database.component';

describe('StatsInDatabaseComponent', () => {
  let component: StatsInDatabaseComponent;
  let fixture: ComponentFixture<StatsInDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsInDatabaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsInDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
