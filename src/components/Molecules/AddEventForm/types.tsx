interface AddEventFormValues {
  nombre: string;
  descripcion: string;
  tipo: number;
  propietario: string;
  fecha_inicial: string;
  fecha_final: string;
  oficio?: string;
  estimado: number;
  lugar: string;
  latitud: number;
  longitud: number;
  chapa?: number;
}

export type { AddEventFormValues };
