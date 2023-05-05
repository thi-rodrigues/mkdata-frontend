import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { TipoPessoa } from 'src/app/model/tipoPessoa';
import { MenssagesComponent } from 'src/app/utils/menssages/menssages.component';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit{

  tipoPessoa: TipoPessoa[];

  pessoaSelecionada: TipoPessoa;

  cliente: Cliente = {
    id: null,
    cpfCnpj: null,
    dataCadastro: new Date(),
    nome: null,
    rgIe: null,
    telefone: null,
    ativo: true,
    tipo: null
  };

  msgs = [{}];

  constructor(
    private clienteService: ClienteService,
    private menssages: MenssagesComponent,
    private router: Router,
    private route: ActivatedRoute
  ) { };

  ngOnInit(): void {
    this.msgs = [];

    this.tipoPessoa = [
      { tipoPessoa: 'Selecione', codigo: 0 },
      { tipoPessoa: 'Pessoa Física', codigo: 1 },
      { tipoPessoa: 'Pessoa Jurídica', codigo: 2 }
    ];
    this.buscarClientesPorId(this.route.snapshot.paramMap.get("id"));
  };

  atualizaraCliente(): void {
    this.clienteService.atualizaraCliente(this.cliente).subscribe(() => {
      // this.menssages.showMensage('success', 'Cliente cadastrado com sucesso!' );
      this.router.navigate(['/clientes']);
    }, (erro) => {
      console.log(erro);
      // for ( const e of erro.mensage ) {
      this.menssages.showMensage('error', erro.error.message);
      // }
    });
  }

  buscarClientesPorId(id: string) {
    this.clienteService.buscarClientesPorId(id).subscribe(cliente => {
      this.cliente = cliente;
    })
  }
}
