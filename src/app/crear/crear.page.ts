import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonMenuButton } from '@ionic/angular/standalone';
import { PersonaCreacionDTO } from 'src/interfaces/IPerson';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { PersonasService } from '../services/personas.service';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonMenuButton, CommonModule, FormsModule, PersonaFormComponent]
})
export class CrearPage implements OnInit {

  personaSeleccionada: PersonaCreacionDTO | undefined = undefined ;

  constructor(private personasServices: PersonasService,private messageService: MessageService,private router: Router) { }

  ngOnInit() {
  }

  async guardarPersona(persona: PersonaCreacionDTO){
    //llamar el service para hacer el post
    try {
      const result = await this.personasServices.create(persona);
      if (result && result.id) {
        // Mostrar mensaje de éxito
        this.messageService.showMessage(
          'success',
          'Persona registrada con éxito.'
        );

        // Opcional: redirigir o limpiar formulario
        this.router.navigate(['/main']);

      } else {
        this.messageService.showMessage(
          'danger',
          'Error al registrar la persona.'
        );
      }
    } catch (error) {
       this.messageService.showMessage('danger','Hubo un error de sistema');
    }
  }
}
