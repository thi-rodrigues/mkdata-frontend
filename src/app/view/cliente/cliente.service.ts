import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Cliente } from '../../model/cliente';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  baseUrl = environment.baseUri + "/clientes";

  constructor(
    private http: HttpClient
  ) {};

  criarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}`, cliente);
  }

  atualizaraCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${cliente.id}`, cliente);
  }

  buscarClientes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  buscarClientesPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  excluirClientesPorId(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

}
