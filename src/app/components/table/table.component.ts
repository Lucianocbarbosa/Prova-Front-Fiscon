import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModelsForm } from 'src/app/page/index/models/modelsForm.models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @Input() ELEMENT_DATA!: ModelsForm[];

  public exibirModalExcluir: boolean = false;

  displayedColumns: string[] = ['nome', 'telefone', 'acao'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  public inputPesquisa!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formCreate();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  formCreate() {
    this.inputPesquisa = this.fb.group({
      filtro: [''],
    });
    this.inputPesquisa.get('filtro')?.valueChanges.subscribe((x) => {
      this.dataSource.filter = x.trim();
    });
  }

  ngAfterViewChecked(): void {
    this.filtroTabela();
  }

  ngAfterViewInit(): void {
    this.filtroTabela();
  }

  abirModalExclusao() {
    this.exibirModalExcluir = true;
  }

  removeData(id: number) {
    const index = this.ELEMENT_DATA.findIndex((e) => {
      return e.id === id;
    });
    this.ELEMENT_DATA.splice(index, 1);
    this.filtroTabela();
    this.closeModal();
  }

  filtroTabela() {
    if (this.inputPesquisa.get('filtro')?.value) {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.filter = this.inputPesquisa
        .get('filtro')
        ?.value.trim()
        .toLowerCase();
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
    }
  }

  closeModal() {
    this.exibirModalExcluir = false;
  }
}
