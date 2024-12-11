import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service'; 
import { CommonModule } from '@angular/common';
import { UserService } from '../user/user.service';  // Импортирайте UserService

interface Car {
  make: string;
  model: string;
  year: string;
  power: string;
}

@Component({
  selector: 'app-my-garage',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './my-garage.component.html',
  styleUrls: ['./my-garage.component.css']
})
export class MyGarageComponent implements OnInit {
  newCar: Car = {
    make: '',
    model: '',
    year: '',
    power: '',
  };

  cars: Car[] = [];
  userId: string | null = null;  // Дефинираме userId

  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserObservable().subscribe((user) => {
      if (user) {
        this.userId = user._id;  // Присвояваме userId от user
        console.log('User ID in ngOnInit:', this.userId);
        this.getCars();
      } else {
        console.log('User is not logged in');
      }
    });
  }

  getCars(): void {
    if (this.userId) {  // Проверяваме дали има userId
      this.apiService.getCars(this.userId).subscribe((cars: Car[]) => {
        console.log('Loaded cars:', cars);  // Добавете този лог
        this.cars = cars;
      }, (error) => {
        console.error('Error loading cars:', error);  // Лог за грешка
      });
    }
  }

  onSubmit() {
    console.log("Submit button clicked");
    console.log('User ID:', this.userId);
  
    if (!this.userId) {
      console.log('User is not logged in');
      return;  // Ако потребителят не е логнат, не изпращаме заявката
    }
  
    if (this.newCar.make && this.newCar.model && this.newCar.year && this.newCar.power && this.userId) {
      this.apiService.addCar(this.userId, this.newCar).subscribe((addedCar: Car) => {
        this.cars.push(addedCar); // Добавете колата към локалния списък
        this.newCar = { make: '', model: '', year: '', power: '' }; // Нулиране на полетата
  
        // След добавянето, извикайте getCars(), за да заредите актуализирания списък с автомобили
        this.getCars(); 
      }, (error) => {
        console.error('Error adding car:', error);
      });
    }
  }
  
}
