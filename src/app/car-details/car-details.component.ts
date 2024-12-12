import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Car } from '../types/car';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  car!: Car;
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const carId = this.route.snapshot.paramMap.get('id')!;
    this.apiService.getCarDetails(carId).subscribe((car) => {
      this.car = car;
      this.isLoading = false;
    });
  }
}
