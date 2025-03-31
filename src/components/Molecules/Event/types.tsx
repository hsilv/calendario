interface Parqueo {
  latitud: number;
  longitud: number;
}

interface EventProps {
  id: string;
  name: string;
  desc: string;
  place: string;
  init_date: Date;
  final_date: Date;
  lat: number;
  lng: number;
  parqueos?: Parqueo[];
  availables?: number;
  placement?: "right" | "left" | "top" | "bottom";
  estado?: "ACTIVO" | "FINALIZADO" | "CANCELADO" | "DENEGADO" | "PENDIENTE";
}

export type { EventProps };
