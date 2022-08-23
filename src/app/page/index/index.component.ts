import { Component, OnInit } from '@angular/core';
import { ModelsForm } from './models/modelsForm.models';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public ELEMENT_DATA: ModelsForm[] = [];
  public exibirModal: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  addTabela(dados: any) {
    console.log(dados);
    this.ELEMENT_DATA.push(dados);
    this.exibirModal = true;
  }

  closeModal() {
    this.exibirModal = false;
  }
}
