import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public form!: FormGroup;

  @Output() eventsubmit = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  submit() {
    let dados = this.form.value;
    dados.telefone = +dados.telefone;
    dados.id = Math.floor(
      Date.now() * Math.random() * Math.random() * Math.random()
    );

    this.eventsubmit.emit(dados);
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
  }
}
