import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { UserService } from '../user/user.service';  
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../types/car';
import { User } from '../types/user';

@Component({
  selector: 'app-my-garage',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './my-garage.component.html',
  styleUrls: ['./my-garage.component.css'],
})
export class MyGarageComponent implements OnInit {
  cars: Car[] = [];
  userId: string | null = null;  
  newCar: Car = {
    id: '',
    _id: '',
    make: '',
    model: '',
    year: '',
    power: '',
    color: '',
    userId: {} as User,  
    owner: '',
    imageUrl: '',
    price: 0,
  };

  constructor(
    private carService: CarService,
    private userService: UserService,  
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserObservable().subscribe((user) => {
      if (user) {
        this.userId = user._id; 
        this.loadCars();  
      }
    });
  }

  loadCars() {
    if (!this.userId) {
      return;  
    }
    this.carService.getCarsByUser(this.userId).subscribe((cars) => {
      this.cars = cars;
    });
  }

  onSubmit() {
    if (this.newCar.make && this.newCar.model && this.newCar.year && this.userId && this.newCar.color && this.newCar.power && this.newCar.imageUrl) {
      this.newCar.userId = { _id: this.userId } as User;  
      this.carService.addCar(this.newCar).subscribe((car) => {
        this.cars.push(car);
        this.newCar = { id: '', _id: '', make: '', model: '', year: '', power: '', color: '', userId: {} as User, owner: '', imageUrl: '' ,price: 0 }; 
      });
    }
  }

  deleteCar(carId: string) {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(carId).subscribe(() => {
        this.cars = this.cars.filter(car => car._id !== carId);  
      });
    }
  }
}
