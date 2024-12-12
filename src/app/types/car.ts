import { UserForAuth } from './user';

export interface Car {
  id: string; // Добавено поле id
  _id: string; // Ако използвате _id за генериране на ID от сървъра
  make: string;
  model: string;
  year: string;
  power: string;
  color: string;
  userId: UserForAuth;
  owner: string;
  price: number;
}
