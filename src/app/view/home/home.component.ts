import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  home = false;

  constructor (
    private appComponent: AppComponent, 
  ) {  }

  ngOnInit(): void {
    this.appComponent.exibirTemplateHTML = true;
  }

  

}
