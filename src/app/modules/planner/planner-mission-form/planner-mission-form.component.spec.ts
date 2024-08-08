import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerMissionFormComponent } from './planner-mission-form.component';

describe('PlannerMissionFormComponent', () => {
  let component: PlannerMissionFormComponent;
  let fixture: ComponentFixture<PlannerMissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlannerMissionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerMissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
