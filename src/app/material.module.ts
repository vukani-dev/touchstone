import {NgModule} from "@angular/core";

import { CommonModule } from '@angular/common';

import {

  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,

  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatExpansionModule,MatChipsModule,MatDividerModule,MatListModule,MatCheckboxModule


} from '@angular/material';


import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({

  imports: [

  CommonModule,

  MatToolbarModule,

  MatButtonModule,

  MatCardModule,

  MatInputModule,

  MatDialogModule,

  MatTableModule,

  MatMenuModule,

  MatIconModule,

  MatProgressSpinnerModule,
  MatExpansionModule,
  MatChipsModule,
  MatSnackBarModule,
  MatDividerModule,
  MatListModule,
  MatCheckboxModule

  ],

  exports: [

  CommonModule,

   MatToolbarModule,

   MatButtonModule,

   MatCardModule,

   MatInputModule,

   MatDialogModule,

   MatTableModule,

   MatMenuModule,

   MatIconModule,

   MatProgressSpinnerModule,
   MatExpansionModule,
   MatChipsModule,
   MatSnackBarModule,
   MatDividerModule,
   MatListModule,
   MatCheckboxModule

   ],

})

export class CustomMaterialModule { }
