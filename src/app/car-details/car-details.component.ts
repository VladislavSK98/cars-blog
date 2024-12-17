import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../services/car.service';  // Или вашия сървис за извличане на данни за автомобилите
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent {
  carId: string;
  car: any;
  likesCount: number = 0; 

  private route = inject(ActivatedRoute);
  private carService = inject(CarService);

  constructor() {
    this.carId = this.route.snapshot.paramMap.get('carId')!;
  }

  ngOnInit() {
    if (this.carId) {
      this.loadCarDetails();
    } else {
      console.error('Invalid car ID');
    }
  }

  loadCarDetails() {
    this.carService.getCarDetails(this.carId).subscribe(
      (data) => {
        this.car = data;
        this.likesCount = data.likesCount;
      },
      (error) => {
        console.error('Error loading car details', error);
      }
    );
  }
}
