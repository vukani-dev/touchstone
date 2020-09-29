import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.authenticationService.logout()
  }

  login(): void {
    this.error = false;
    var loginResult = this.authenticationService.login(this.username, this.password);
    console.log(loginResult);
    if (loginResult != null) {
      this.router.navigate(['start']);
    }
    else {
      this.error = true;
    }
  }

  goToRegistration(): void {
    this.router.navigate(['register']);

  }
}
