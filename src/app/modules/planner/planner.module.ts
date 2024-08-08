import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerComponent } from './planner.component';
import { RouterModule, Routes } from '@angular/router';
import { PlannerMissionFormComponent } from './planner-mission-form/planner-mission-form.component';
import { PlannerMissionTableComponent } from './planner-mission-table/planner-mission-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
  {
    path: '',
    component: PlannerComponent,
  },
];


@NgModule({
  declarations: [
    PlannerComponent,
    PlannerMissionFormComponent,
    PlannerMissionTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)],
})
export class PlannerModule { }
