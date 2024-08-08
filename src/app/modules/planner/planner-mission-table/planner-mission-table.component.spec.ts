import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerMissionTableComponent } from './planner-mission-table.component';

describe('PlannerMissionTableComponent', () => {
  let component: PlannerMissionTableComponent;
  let fixture: ComponentFixture<PlannerMissionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlannerMissionTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerMissionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
