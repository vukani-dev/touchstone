import { Component, OnInit } from '@angular/core';
import { Hero } from '../_models'
import { HEROES, UserService } from '../_services';
import {AppComponent} from '../app.component'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  heroesList: Hero[]
  constructor(root:AppComponent,private userService: UserService,private snackBar: MatSnackBar) {
    this.heroesList = HEROES
    root.page = 'Available Heroes'
   }

  ngOnInit() {
  }

  hireHero(hero:Hero){
    this.userService.addHero(hero);
    this.openSnackBar("Hero: " + hero.name + " added!")
  }
  openSnackBar(message: string) {
      this.snackBar.open(message, 'Gotcha', {
        duration: 3000,
      });
    }
}
