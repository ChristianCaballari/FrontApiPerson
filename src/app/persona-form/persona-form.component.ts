import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { IonicModule } from '@ionic/angular';
import { PersonaCreacionDTO } from 'src/interfaces/IPerson';
import { FieldErrorComponent } from '../field-error/field-error.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    FieldErrorComponent,
    RouterModule,
  ],
})
export class PersonaFormComponent implements OnInit {
  @Input() persona?: PersonaCreacionDTO; //Si hay data, es porque vamos a editar
  @Output() formSubmit = new EventEmitter<PersonaCreacionDTO>();

  formPersona!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formPersona = this.fb.group({
      nombre: [this.persona?.nombre || '', Validators.required],
      apellido: [this.persona?.apellido || '', Validators.required],
      fechaNacimiento: [
        this.persona?.fechaNacimiento || '',
        Validators.required,
      ],
      email: [
        this.persona?.email || '',
        [Validators.required, Validators.email],
      ],
      telefono: [this.persona?.telefono || ''],
      direccion: [this.persona?.direccion || ''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['persona'] && this.persona && this.formPersona) {
      this.formPersona.patchValue(this.persona);
    }
  }

  guardarPersona() {
    if (this.formPersona.valid) {
      this.formSubmit.emit(this.formPersona.value);
    }
  }
}
