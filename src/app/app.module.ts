import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './view/home/home.component';
import { MenssagesComponent } from './utils/menssages/menssages.component';
import { Home2Component } from './view/home2/home2.component';
import { ClienteListComponent } from './view/cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './view/cliente/cliente-form/cliente-form.component';
import { ClienteEditComponent } from './view/cliente/cliente-edit/cliente-edit.component';

import {MatTreeModule} from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    Home2Component,
    MenssagesComponent,
    ClienteListComponent,
    ClienteFormComponent,
    ClienteEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AppRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    MessagesModule,
    TableModule,
    DropdownModule,
    InputMaskModule,
    ConfirmDialogModule,
    InputNumberModule,
    MatTreeModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  providers: [ MessageService, MenssagesComponent, RouterLink, ConfirmationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
