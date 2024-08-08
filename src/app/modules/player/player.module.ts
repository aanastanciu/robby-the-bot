import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PipesModule } from '../../utils/pipes/pipes.module';



const routes: Routes = [
  {
    path: '',
    component: PlayerComponent,
  },
];

@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    PipesModule,
    RouterModule.forChild(routes),
  ]
})
export class PlayerModule { }