import { Component, OnInit } from '@angular/core';
import { Hero, User } from '../_models'
import { UserService, AuthenticationService } from '../_services';
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-my-heroes',
  templateUrl: './my-heroes.component.html',
  styleUrls: ['./my-heroes.component.css']
})
export class MyHeroesComponent implements OnInit {

  total: number;
  heroes: any[];
  discount10 = false;
  discount20 = false;
  discount30 = false;

  constructor(root: AppComponent, private userService: UserService, private authenticationService: AuthenticationService) {
    let currentUser: User;
    this.authenticationService.currentUser.subscribe(x => currentUser = x);

    root.page = currentUser.username + "'s Heroes"
  }

  ngOnInit() {
    var calcTotal = 0;
    this.heroes = this.userService.getHeroes();

    if (this.heroes != undefined) {
      this.heroes.forEach(function(hero) {
        calcTotal = calcTotal + hero.price;
      });

      this.total = calcTotal;
    }
  }

  discountChecked(discountAmt:number) {

    if(discountAmt == 10){
      if(this.discount10){
        discountAmt = -10
        this.discount10 = false
      }
      else{
        this.discount10 = true
      }
    }
    if(discountAmt == 20){
      if(this.discount20){
        discountAmt = -20
        this.discount20 = false
      }
      else{
        this.discount20 = true
      }
    }
    if(discountAmt == 30){
      if(this.discount30){
        discountAmt = -30
        this.discount30 = false
      }
      else{
        this.discount30 = true
      }
    }
    this.total = this.total - discountAmt;
  }

}
