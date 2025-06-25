import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Search } from 'src/interfaces/ISearch';
import { FieldErrorComponent } from 'src/app/field-error/field-error.component';


@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    FieldErrorComponent,
  ],
})
export class FormSearchComponent {
  @Output() buscar = new EventEmitter<Search>();
  inputType = 'text';

  formBusqueda: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formBusqueda = this.fb.group({
      filtro: ['', Validators.required],
      valor: ['', Validators.required],
    });
  }

  onFiltroChange(event: any) {
    const selected = event.detail.value;
    this.inputType = selected === 'email' ? 'email' : 'text';

    const valorControl = this.formBusqueda.get('valor');

    valorControl?.clearValidators();

    valorControl?.setValidators([
      Validators.required,
      selected === 'email' ? Validators.email : Validators.nullValidator,
    ]);
    valorControl?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.formBusqueda.valid) {
      this.buscar.emit(this.formBusqueda.value);
    }
  }
}
