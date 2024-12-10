import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  // Навигация към страницата с автомобили
  goToMyCars() {
    this.router.navigate(['/my-garage']); // Предполага се, че имате страница за автомобили
  }

  // Навигация към страницата за публикации
  goToPosts() {
    this.router.navigate(['/posts']); // Предполага се, че имате страница за постове
  }

}
