import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  playerName;
  gameData = []
  time
  gameMode;
  selectedImg;
  stillPlaying;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getImages(8)

    // this.http.get('https://aws.random.cat/meow').subscribe( res => {
    //   console.log(res)
    // })
  }

  // res.header("Access-Control-Allow-Origin", "*");
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  getImages(amount) {
      this.http.get('/api/birds?count=' + amount).subscribe((res:any) => {
        for (var i = 1; i <= 2; i++) {
          res.forEach(img => {
            this.gameData.push({img, 'found': false})
          });
        }
        console.log(this.gameData)
    });
  };

  clickImg(value) {
    if(!this.selectedImg) this.selectedImg = value.img;
    else {
      if(value.img === this.selectedImg) {
        this.gameData.forEach(element => {
          if(element.img === value.img) {
            element.found = true;
          }
        });
        this.selectedImg = '';
        this.checkGame();
      }
      else this.selectedImg = '';
    }
  }

  checkGame() {
    let serach = this.gameData.find(element => element.found === false);
    if(!serach) {
      console.log('game ended')
    } else {
      console.log('stil playing')
    }
  }

}

