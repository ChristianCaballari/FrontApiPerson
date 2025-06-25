import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { enviroment } from 'src/environments/environment';
import { PersonaDTO } from 'src/interfaces/IPerson';
import { PersonaCreacionDTO } from '../../interfaces/IPerson';
import { Search } from 'src/interfaces/ISearch';

const base_url = enviroment.base_url;

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  httpClient = inject(HttpClient);

  search(search: Search): Promise<PersonaDTO[] | { mensaje: string }> {
    return firstValueFrom(
      this.httpClient.get<PersonaDTO[] | { mensaje: string }>(
        `${base_url}/personas/buscar?filtro=${search.filtro}&valor=${search.valor}`
      )
    );
  }

  getAll(): Promise<PersonaDTO[]> {
    return firstValueFrom(
      this.httpClient.get<PersonaDTO[]>(`${base_url}/personas`)
    );
  }

  getById(id: number): Promise<PersonaDTO> {
    return firstValueFrom(
      this.httpClient.get<PersonaDTO>(`${base_url}/personas/${id}`)
    );
  }

  eliminar(id: number): Promise<void> {
    return firstValueFrom(
      this.httpClient.delete<void>(`${base_url}/personas/${id}`)
    );
  }

  create(persona: PersonaCreacionDTO): Promise<PersonaDTO> {
    return firstValueFrom(
      this.httpClient.post<PersonaDTO>(`${base_url}/personas`, persona)
    );
  }

  update(persona: PersonaCreacionDTO, id: number): Promise<HttpResponse<void>> {
    return firstValueFrom(
      this.httpClient.put<void>(
        `${base_url}/personas/${id}`,
        persona,
        { observe: 'response' } // 👈 clave
      )
    );
  }
}
