import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighscoreComponent } from './components/highscore/highscore.component';
@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HighscoreComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
