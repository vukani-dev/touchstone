import { Component } from '@angular/core';
import { AuthenticationService, UserService } from './_services';
import { User } from './_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-touchstone';

  currentUser: User;
  page: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  public setPageTitle(pageName: string) {
    this.page = pageName
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  deleteAccount(){
    this.userService.delete(this.currentUser.id);
    this.logout()
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
