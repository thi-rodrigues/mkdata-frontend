import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {
  
  home2 = false;

  constructor (
    private appComponent: AppComponent
  ) {  }

  ngOnInit(): void {
    this.appComponent.exibirTemplateHTML = true;
    this.home2 = true;
  }

  

}
