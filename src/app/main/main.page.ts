import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PersonaCreacionDTO, PersonaDTO } from 'src/interfaces/IPerson';
import { PersonasService } from '../services/personas.service';
import { ViewWillEnter } from '@ionic/angular';

import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { MessageService } from '../services/message.service';
import { Search } from 'src/interfaces/ISearch';
import { FormSearchComponent } from '../components/form-search/form-search.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, FormSearchComponent],
})
export class MainPage implements OnInit, ViewWillEnter {
  personas: PersonaDTO[] = [];

  cargando: Boolean = true;

  personasService = inject(PersonasService);

  constructor(
    private alertController: AlertController,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.obtenerPersonas();
  }

  //Este método se llama cada vez que entras a la vista
  ionViewWillEnter() {
    this.obtenerPersonas();
  }

  filtrarPersonas() {}
  async obtenerPersonas() {
    this.cargando = true;
    try {
      const response = await this.personasService.getAll();
      this.personas = [...response];//para renderizar la lista
    } catch (error) {
      console.error('Error al obtener personas:', error);
      await this.messageService.showMessage(
        'danger',
        'Hubo un error al recuperar los datos'
      );
    } finally {
      this.cargando = false;
    }
  }

  async eliminarPersona(persona: PersonaDTO) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Está seguro de que desea eliminar a ${persona.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'primary',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.personasService.eliminar(persona.id); // 👈 Espera eliminación
              await this.messageService.showMessage(
                'success',
                'Persona eliminada con éxito.'
              );
              this.obtenerPersonas();
            } catch (error) {
              console.error('Error al eliminar persona:', error);
              await this.messageService.showMessage(
                'danger',
                'Error al eliminar a la persona'
              );
            }
          },
          cssClass: 'danger',
        },
      ],
    });
    await alert.present();
  }

  // Buscar persona

  async buscarPersonas(search: Search){
      try {
        this.cargando = true;
        const result = await this.personasService.search(search);
        console.log(typeof result)
        if ('mensaje' in result) {
          this.messageService.showMessage('warning', result.mensaje);
          this.personas = []
        } else {
          this.personas = result;
        }
      } catch (error) {
        this.messageService.showMessage('danger','Error al buscar personas')
      }finally{
        this.cargando = false;
      }
  }
}
