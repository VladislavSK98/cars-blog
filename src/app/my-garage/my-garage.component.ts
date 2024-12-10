import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Включваме FormsModule
import { RouterModule } from '@angular/router';

interface Car {
  make: string;
  model: string;
  year: string;
  power: string;
}

Component({
  selector: 'app-my-garage',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './my-garage.component.html',
  styleUrls: ['./my-garage.component.css']
})
export class MyGarageComponent {
  newCar: Car = {
    make: '',
    model: '',
    year: '',
    power: '',
  };

  cars: Car[] = [];  // Декларираме масива като масив от Car обекти

  onSubmit() {
    if (this.newCar.make && this.newCar.model && this.newCar.year && this.newCar.power) {
      // Добавяме новата кола към списъка
      this.cars.push({...this.newCar});
      // Рестартираме формата
      this.newCar = { make: '', model: '', year: '', power: '' };
    }
  }
}