import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissionService } from '../../../services/mission.service';
import { duplicateMissionValidator } from '../../../utils/validators/duplicate-mission-validator';

@Component({
  selector: 'app-planner-mission-form',
  templateUrl: './planner-mission-form.component.html',
  styleUrl: './planner-mission-form.component.scss'
})
export class PlannerMissionFormComponent implements OnInit {
  @ViewChild('missionFormDirective') private missionFormDirective!: NgForm;

  missionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private missionService: MissionService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.buildMissionForm();
  }

  buildMissionForm() {
    this.missionForm = this.formBuilder.group({
      missionName: new FormControl('', [Validators.required]),
      xCoordinate: new FormControl('', [Validators.required, Validators.max(99)]),
      yCoordinate: new FormControl('', [Validators.required, Validators.max(99)]),
    }, { validators: duplicateMissionValidator(this.missionService) });
  }

  onSubmit(): void {
    if (this.missionForm.valid) {
      const formData = this.missionForm.value;

      this.missionService.saveMission(formData);
      this.missionFormDirective.resetForm();
      this.initSnackBar('Mission created!');
    } else {
      alert('Form invalid!')
    }
  }

  get control(): { [key: string]: AbstractControl } {
    return this.missionForm.controls;
  }

  initSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
