import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameStatus: 'new' | 'inactive' | 'running' | 'won';
  gameLevels;
  playerName;
  gameImages = [];
  gameMode = 'medium';
  selectedImg;
  onTimeOut = false;
  gameTime;
  highscore = [];
  yourPrize;
  loading = false;

  constructor (
      private http: HttpClient,
      private dataService: DataService
    ){
    this.gameLevels = [
      { lvlText: 'easy', lvlValue: 3 },
      { lvlText: 'medium', lvlValue: 6 },
      { lvlText: 'hard', lvlValue: 12 },
      { lvlText: 'hell', lvlValue: 50 }
    ];
  }


  ngOnInit() {
    if(localStorage.playerName) this.playerName = localStorage.playerName;

    if(localStorage.images) {
      this.gameImages = JSON.parse(localStorage.getItem('images'));
      this.gameTime = parseInt(localStorage.getItem('gameTime'));
      this.playerName = localStorage.getItem('playerName');
      this.gameMode = localStorage.getItem('mode');
      this.gameStatus = 'inactive';
    } else {
      this.gameStatus = 'new'
    }
  }



  startGame() {
    let numberOfImages = this.gameLevels.find(e => e.lvlText === this.gameMode);
    localStorage.setItem('mode', this.gameMode);
    localStorage.setItem('playerName', this.playerName);
    localStorage.removeItem('images');
    localStorage.removeItem('gameTime');
    this.gameImages = [];
    this.gameTime = 0;
    this.getImages(numberOfImages.lvlValue);
    this.startTimer();
    this.gameStatus = 'running';
  }

  resumeGame() {
    this.gameStatus = 'running'
    this.startTimer();
  }


  getImages(amount) {
    this.loading = true;
      this.http.get('https://dog.ceo/api/breeds/image/random/' + amount).subscribe((res:any) => {
        this.loading = false;
        for (var i = 1; i <= 2; i++) {
          res.message.forEach(img => {
            this.gameImages.push({img, 'found': false, 'active': false});
          });
        }
        this.gameImages = this.gameImages.map(x => [Math.random(), x]).sort(([a], [b]) => a - b).map(([_, x]) => x);
        localStorage.setItem('images', JSON.stringify(this.gameImages));
    });
  };

  clickImg(value) {
    value.active = true;
    if(!this.selectedImg) this.selectedImg = value.img;
    else {
      if(value.img === this.selectedImg) {
        this.gameImages.forEach(element => {
          if(element.img === value.img) {
            element.active = false;
            element.found = true;
            localStorage.setItem('images', JSON.stringify(this.gameImages));
          }
        });
        this.selectedImg = '';
        this.checkGame();
      }
      else {
        this.onTimeOut = true;
        this.selectedImg = '';
        setTimeout(() => {
          this.gameImages.forEach(element => {
            element.active = false;
          });
          this.onTimeOut = false;
        }, 1000);
      }
    }
  }

  checkGame() {
    let serach = this.gameImages.find(element => element.found === false);
    if(!serach) {
      this.gameStatus = 'won';
      localStorage.removeItem('images');
      this.highscore.push({'name': this.playerName, 'mode': this.gameMode, 'time': this.gameTime});
      const gameInfo = { 'playerName': this.playerName, 'mode': this.gameMode, 'time': this.gameTime }
      this.dataService.savehighscore(gameInfo);
      this.youWon()
    }
  }

  startTimer() {
    setInterval( () => {
      if(this.gameStatus === 'running') {
        this.gameTime += 1;
        localStorage.setItem('gameTime', JSON.stringify(this.gameTime))
      }
    }, 10);
  }


  youWon() {
    localStorage.removeItem('images')
    this.http.get('https://api.icndb.com/jokes/random?firstName=' + this.playerName).subscribe((res:any) => {
      this.yourPrize = res.value.joke
    })
  }
}

