interface EventProps {
  name: string;
  desc: string;
  place: string;
  init_date: Date;
  final_date: Date;
  lat: number;
  lng: number;
  parkings: number;
}

export type { EventProps };
