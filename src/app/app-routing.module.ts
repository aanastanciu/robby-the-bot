import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'planner',
    loadChildren: () =>
      import('./modules/planner/planner.module').then(
        (module) => module.PlannerModule
      ),
  },
  {
    path: 'player',
    loadChildren: () =>
      import('./modules/player/player.module').then(
        (module) => module.PlayerModule
      ),
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
