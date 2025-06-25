export interface PersonaDTO {
     id: number;
     nombre: string;
     apellido: string;
     fechaNacimiento: string;
     email: string;
     telefono?: string;
     direccion?: string;
     fechaRegistro: string;
}

export interface PersonaCreacionDTO extends Omit<PersonaDTO, 'id' | 'fechaRegistro'> {}

