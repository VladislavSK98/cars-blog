import { User } from './user';

export interface Car {
  id: string;
  _id: string;
  make: string;
  model: string;
  year: string;
  power: string;
  color: string;
  userId: User; 
  owner: string;
  price: number;
  likesCount?: number;
  imageUrl: string; 
}
