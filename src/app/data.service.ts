import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFirestore) { }

  savehighscore(value){
    return this.db.collection('highscore').add({
      name: value.playerName,
      time: value.time,
      mode: value.mode
    });
  }

  getHighscore(){
    return this.db.collection('highscore').snapshotChanges();
  }
}
