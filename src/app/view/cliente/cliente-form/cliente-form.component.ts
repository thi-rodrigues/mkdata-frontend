

import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../../../model/cliente';
import { MenssagesComponent } from '../../../utils/menssages/menssages.component';
import { Router } from '@angular/router';
import { TipoPessoa } from 'src/app/model/tipoPessoa';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import { Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';

export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

const TREE_DATA = {
  Telefone: {
    '': ''  as string,
  },
};

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    const data = this.buildFileTree(TREE_DATA, 0);
    this.dataChange.next(data);
  }

  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 0);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  providers: [MenssagesComponent, ChecklistDatabase]
})

export class ClienteFormComponent implements OnInit {

  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  selectedParent: TodoItemFlatNode | null = null;

  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  tipoPessoa: TipoPessoa[];

  pessoaSelecionada: TipoPessoa;

  // cliente: Cliente = {
  //   id: null,
  //   cpfCnpj: null,
  //   dataCadastro: new Date(),
  //   nome: null,
  //   rgIe: null,
  //   telefone: null,
  //   ativo: true,
  //   tipo: null
  // };

  cliente: Cliente = {
    id: null,
    cpfCnpj: null,
    dataCadastro: new Date(),
    nome: null,
    rgIe: null,
    telefone: [],
    ativo: true,
    tipo: null
  };

  msgs = [{}];
  contador = 0;

  tipoPessoaLabel: string
  tipoIdentificacao: string
  tipoPessoaLabelBolean = true;

  mascaraCpfCnpj = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private _database: ChecklistDatabase
  ) { 
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  };

  ngOnInit(): void {
    this.msgs = [];

    this.tipoPessoa = [
      { tipoPessoa: 'Selecione', codigo: 0 },
      { tipoPessoa: 'Pessoa Física', codigo: 1 },
      { tipoPessoa: 'Pessoa Jurídica', codigo: 2 }
    ];
  };

  criarCliente(): void {
    this.clienteService.criarCliente(this.cliente).subscribe(() => {
      this.router.navigate(['/clientes']);
    }, (erro) => {
      console.log(erro);
    });
  }

  tipoPessoaEvento(event: any) {
    if (event.value === 'Pessoa Jurídica') {
      this.tipoPessoaLabel = 'CNPJ';
      this.tipoIdentificacao = 'IE'
      this.mascaraCpfCnpj = '99.999.999/9999-99';
    } else {
      this.tipoPessoaLabel = 'CPF';
      this.tipoIdentificacao = 'RG';
      this.mascaraCpfCnpj = "999.999.999-99";
    }
    event.value !== 'Selecione' ? this.tipoPessoaLabelBolean = false : [this.tipoPessoaLabelBolean = true, this.tipoPessoaLabel = '', this.tipoIdentificacao = ''];
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item ? existingNode : new TodoItemFlatNode();
      flatNode.item = node.item;
      flatNode.level = level;
      flatNode.expandable = !!node.children?.length;
      this.flatNodeMap.set(flatNode, node);
      this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    console.log(node);
    
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  addNewItem(node: TodoItemFlatNode) {
    console.log(node);
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  saveNode(node: TodoItemFlatNode, telefone: string) {
    console.log(node);
    console.log(telefone);
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, telefone);
    this.cliente.telefone.push({telefone});
  }
}


