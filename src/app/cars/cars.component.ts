import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Car } from '../types/car';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllCars().subscribe((cars) => {
      this.cars = cars;
      this.isLoading = false;
    });
  }
}
