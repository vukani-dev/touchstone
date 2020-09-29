import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing }        from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { StartComponent } from './start/start.component';
import { RegisterComponent } from './register/register.component';
import { CustomMaterialModule } from './material.module';
import { MyHeroesComponent } from './my-heroes/my-heroes.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StartComponent,
    RegisterComponent,
    MyHeroesComponent
  ],
  imports: [
    routing,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    CustomMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
