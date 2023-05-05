import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ ],
  
  imports: [
    CommonModule,
    RouterModule
  ],
  

  exports: [  ],

  providers: [
    Title
  ]
})
export class CoreModule { }