import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

  home = false;

  ngOnInit(): void {
    if ( location.href === 'https://mkdata-frontend.herokuapp.com/inicio') {
      this.home = true;
    }
  }

  clicou(e: any) {
    e === 'cadastro' ? this.home = false : this.home = true;
  }
}
