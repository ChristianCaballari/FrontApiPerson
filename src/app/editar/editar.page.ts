import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons } from '@ionic/angular/standalone';
import { PersonaCreacionDTO, PersonaDTO } from 'src/interfaces/IPerson';
import { PersonasService } from '../services/personas.service';
import { MessageService } from '../services/message.service';
import { PersonaFormComponent } from '../persona-form/persona-form.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    CommonModule,
    FormsModule,
    PersonaFormComponent,
  ],
})
export class EditarPage implements OnInit {
  personaId!: number;
  personaSeleccionada!: PersonaDTO;

  constructor(
    private route: ActivatedRoute,
    private personasService: PersonasService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.personaId = Number(this.route.snapshot.paramMap.get('id'));
    this.getById();
  }

  async getById() {
    try {
      this.personaSeleccionada = await this.personasService.getById(this.personaId);
      console.log(this.personaSeleccionada)
    } catch (error) {
      console.error('Error al obtener la persona:', error);
      await this.messageService.showMessage(
        'danger',
        'No se pudo cargar la información de la persona.'
      );
    }
  }

   async updatePersona(persona: PersonaCreacionDTO){
      //llamar el service para hacer el post
      try {
        const result = await this.personasService.update(persona,this.personaSeleccionada.id);
        if (result.status === 204) {
          // Mostrar mensaje de éxito
          this.messageService.showMessage(
            'success',
            'Persona actualizada con éxito.'
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
