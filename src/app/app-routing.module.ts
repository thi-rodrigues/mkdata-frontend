import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './view/home/home.component';
import { ClienteFormComponent } from './view/cliente/cliente-form/cliente-form.component';
import { AppComponent } from './app.component';
import { Home2Component } from './view/home2/home2.component';
import { ClienteListComponent } from './view/cliente/cliente-list/cliente-list.component';
import { ClienteEditComponent } from './view/cliente/cliente-edit/cliente-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }, 
  { path: 'cadastro', component: ClienteFormComponent     },
  { path: 'inicio',   component: HomeComponent      },
  { path: 'home',     component: Home2Component     },
  { path: 'teste',    component: AppComponent       },
  { path: 'clientes',   component: ClienteListComponent },
  { path: 'clientes/editar/:id',   component: ClienteEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }
