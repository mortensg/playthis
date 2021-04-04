import { HighscoreComponent } from './components/highscore/highscore.component';
import { GameComponent } from './components/game/game.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'highscore', component: HighscoreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
