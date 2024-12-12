import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';  
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user/user.service';  
import { Car } from '../types/car';
import { Subscription } from 'rxjs';
import { UserForAuth } from '../types/user';

@Component({
  selector: 'app-my-garage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-garage.component.html',
  styleUrls: ['./my-garage.component.css']
})
export class MyGarageComponent implements OnInit, OnDestroy {
  newCar: Car = {
    id: '',  // Добавено поле id
    _id: '',  // Празно за генериране на _id от сървъра
    make: '',
    model: '',
    year: '',
    power: '',
    color: '',
    userId: {} as UserForAuth,  // Начална стойност като празен обект
    owner: '',
    price: 0
  };

  cars: Car[] = [];
  userId: string | null = null; 
  userSubscription: Subscription | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService: UserService 
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.getUserObservable().subscribe(user => {
      if (user) {
        this.userId = user.userId;  // Използвайте userId вместо id, ако е необходимо
        this.loadCars();
      } else {
        this.userId = null;
        console.error('User not logged in');
      }
    });
  }

  loadCars(): void {
    if (this.userId) {
      this.apiService.getCarsByUser(this.userId).subscribe(
        (data: Car[]) => {
          this.cars = data; 
        },
        (error) => {
          console.error('Error fetching cars', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (
      this.newCar.make &&
      this.newCar.model &&
      this.newCar.year &&
      this.newCar.power &&
      this.newCar.color &&
      this.userService.user
    ) {
      const carToAdd: Car = {
        ...this.newCar,
        id: '',  // Празно или зададете стойност
        userId: this.userService.user,
        owner: this.userService.user?.username || '',
        price: 0 
      };

      this.apiService.addCar(carToAdd).subscribe(
        (addedCar: Car) => {
          this.cars.push(addedCar);  
          this.newCar = { id: '', _id: '', make: '', model: '', year: '', power: '', color: '', userId: {} as UserForAuth, owner: '', price: 0 };  
        },
        (error) => {
          console.error('Error adding car', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
