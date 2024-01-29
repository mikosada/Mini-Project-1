export interface IEvent {
  id: number;
  name: string;
  slug: string;
  price: number;
  date: Date;
  time: Date;
  description: string;
  location: string;
  type: string;
  seat: number;
  status: string;
  categoryId: string;
  created_at: string;
  rating: number;
  medias: IMedia[];
}

export interface IMedia {
  url: string;
}

export interface EventsProps {
  events: IEvent[];
}
