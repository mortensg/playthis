import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import { Highscore } from '../../models/highscore'

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {
  items;
  highscore: Highscore[];
  displayData;
  selectedMode = 'all';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getHighscore().subscribe((data: any) => {
      this.items = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Highscore;
      })
      this.items.sort(function(a, b) {
        return parseFloat(a.time) - parseFloat(b.time);
    });
    this.displayData = this.items;
    })
  }

  filterData(value) {
    this.selectedMode = value;

    if(value == 'all') this.displayData = this.items;
    else this.displayData = this.items.filter(item => item.mode == value);

  }

}
