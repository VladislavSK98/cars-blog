import { Component } from '@angular/core';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { ThemesListComponent } from '../theme/themes-list/themes-list.component';
import { UserService } from '../user/user.service';
import { HomeComponent } from '../home/home.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ThemesListComponent, PostsListComponent, HomeComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) {}
}
