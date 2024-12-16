import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { UserService } from '../user/user.service';  // Импортиране на UserService
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
  userId: string | null = null;  // Декларираме променлива за userId
  newCar: Car = {
    id: '',
    _id: '',
    make: '',
    model: '',
    year: '',
    power: '',
    color: '',
    userId: {} as User,  // Начално задаваме userId като празен обект от тип User
    owner: '',
    price: 0,
  };

  constructor(
    private carService: CarService,
    private userService: UserService,  // Инжектиране на UserService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserObservable().subscribe((user) => {
      if (user) {
        this.userId = user._id;  // Извличаме userId от текущия потребител
        this.loadCars();  // Зареждаме автомобилите, след като имаме userId
      }
    });
  }

  loadCars() {
    if (!this.userId) {
      return;  // Ако няма userId, не изпълняваме заявката
    }
    this.carService.getCarsByUser(this.userId).subscribe((cars) => {
      this.cars = cars;
    });
  }

  onSubmit() {
    if (this.newCar.make && this.newCar.model && this.newCar.year && this.userId && this.newCar.color && this.newCar.power) {
      this.newCar.userId = { _id: this.userId } as User;  // Задаваме правилното userId
      this.carService.addCar(this.newCar).subscribe((car) => {
        this.cars.push(car);
        this.newCar = { id: '', _id: '', make: '', model: '', year: '', power: '', color: '', userId: {} as User, owner: '', price: 0 }; // Изчистваме формата
      });
    }
  }

  deleteCar(carId: string) {
    this.carService.deleteCar(carId).subscribe(() => {
      this.cars = this.cars.filter(car => car.id !== carId); // Премахваме изтрития автомобил от списъка
    });
  }
}
