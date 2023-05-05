import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  
  exibirTemplateHTML = false;

  ngOnInit(): void {
      if ( location.href === 'https://mkdata-frontend.herokuapp.com/' || location.href === 'https://mkdata-frontend.herokuapp.com/inicio' ) {
        this.exibirTemplateHTML = false;
      } else {
        this.exibirTemplateHTML = true;
      }
  }
}
