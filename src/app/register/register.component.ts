import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService, UserService } from '../_services';
import { Router, } from '@angular/router';
import { Hero, User } from '../_models'
import { matchOtherValidator } from '../_helper'
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
      cpassword: ['', [Validators.required, Validators.minLength(3), matchOtherValidator('password')]]
    });
  }

  get f() { return this.registerForm.controls; }

  register() {
    this.error = false;
    if (this.registerForm.invalid) {
      console.log(this.registerForm)
      return;
    }

    let form = this.registerForm.value;
    let newUser = new User()
    newUser.firstName = form.fname;
    newUser.lastName = form.lname;
    newUser.username = form.username;
    newUser.password = form.password;

    var response = this.userService.register(newUser);

    if (response != null){
      this.openSnackBar('User '+ newUser.username +' has been created!')
      this.router.navigate(['login']);
    }

    this.error = true;


  }

  goBack() {
    this.router.navigate(['login']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

}
