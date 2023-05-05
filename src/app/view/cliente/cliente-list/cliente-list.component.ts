import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cliente } from 'src/app/model/cliente';
import { MenssagesComponent } from 'src/app/utils/menssages/menssages.component';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

msgs = [{}];

clientes: Cliente[] = [];;

loading: boolean = true;

activityValues: number[] = [0, 100];

constructor( 
  private clienteService: ClienteService,
  private router: Router,
  private confirmationService: ConfirmationService, private messageService: MessageService,
  private menssages: MenssagesComponent,
){ }

  ngOnInit(): void {
    this.msgs = [];

    this.clienteService.buscarClientes().subscribe(clientes => {
      this.clientes = clientes.content;
      this.loading = false;
    }, (erro) => {
      console.log(erro);
    });
  }

  clear(table: Table) {
    table.clear();
  }

  editar(id: number) {
    this.router.navigate([`/clientes/editar/${id}`])
  }

  confirmarExclusao(nome: string, id: number) {
    this.confirmationService.confirm({
        message: 'Deseja realmente excluir o cliente ' + nome + '?',
        header: 'Confirmar Exclusão',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.excluir(id);
        },
        reject: (type: any) => {
        }
    });
  }

  excluir(id: number) {
    this.clienteService.excluirClientesPorId(id).subscribe(e => {
      this.ngOnInit();
    });
  }
}

