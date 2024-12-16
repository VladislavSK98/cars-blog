import { Component } from '@angular/core';
import { CarService } from '../services/car.service';
import { Router, RouterModule } from '@angular/router';
import { Car } from '../types/car';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {
  cars: Car[] = [];
  isLoading: boolean = true;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.isLoading = false;
    });
  }

  likeCar(carId: string) {
    this.carService.likeCar(carId).subscribe(
      () => {
        // Успешно харесана кола, можеш да покажеш съобщение или да обновиш списъка
        console.log(`Car with ID ${carId} liked successfully!`);
      },
      (error) => {
        console.error('Error liking car:', error);
      }
    );
  }
}
