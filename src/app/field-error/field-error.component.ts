import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-text color="danger" *ngIf="mensaje">
      <p class="ion-padding-start">{{ mensaje }}</p>
    </ion-text>
  `,
})
export class FieldErrorComponent {
  @Input() controlForm!: AbstractControl | null;

  get errorMessage(): string | null {
    if (
      !this.controlForm ||
      !this.controlForm.errors ||
      (!this.controlForm.dirty && !this.controlForm.touched)
    ) {
      return null;
    }

    if (this.controlForm.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (this.controlForm.hasError('email')) {
      return 'Por favor, ingrese un email valido';
    }

    this.controlForm.hasError('email');

    return null;
  }
}
