import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationBuilderComponent } from './classification-builder/classification-builder.component';
import { ClassificationPlayerComponent } from './classification-player/classification-player.component';
import { NarrativeBuilderComponent } from './narrative-builder/narrative-builder.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  {
    path: 'play/:filename/userId/:userId', component: PlayerComponent,
  },
  {
    path: 'play/:filename/:classifyName', component: ClassificationPlayerComponent,
  },
  {
    path: 'nar/:classifyName', component: NarrativeBuilderComponent,
  },
  {
    path: '**', component: ClassificationBuilderComponent //MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
