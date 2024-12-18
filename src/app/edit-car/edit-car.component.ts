import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from '../services/car.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../types/car';
import { User } from '../types/user'

@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent {
  carId: string = '';
  car: Car = {
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
    price: 0
  };
  isLoading: boolean = true;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carId = this.activatedRoute.snapshot.paramMap.get('carId')!;
    this.loadCar();
  }

  loadCar() {
    this.carService.getCarById(this.carId).subscribe({
      next: (car) => {
        this.car = car;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading car', err);
      },
    });
  }

  onSubmit() {
    this.carService.updateCar(this.carId, this.car).subscribe({
      next: () => {
        this.router.navigate(['/cars']);
      },
      error: (err) => {
        console.error('Error updating car', err);
      },
    });
  }
}
