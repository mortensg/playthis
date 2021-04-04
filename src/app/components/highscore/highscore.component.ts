import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {

  data;

  constructor() { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('highscore'));
  }

}
