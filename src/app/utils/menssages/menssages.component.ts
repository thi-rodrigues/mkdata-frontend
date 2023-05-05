import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-menssages',
  templateUrl: './menssages.component.html',
  styleUrls: ['./menssages.component.css'],
  providers: [MessageService]
})

export class MenssagesComponent {

  msgs = [{}];

  constructor( private messageService: MessageService ) {};

  showMensage( severity: string, detailMensage: string ) {
    this.messageService.add({ 
      severity: severity, 
      detail: detailMensage, 
      life: 3000
    });
  };

}
