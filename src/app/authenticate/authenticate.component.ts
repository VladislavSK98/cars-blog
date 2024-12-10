import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoaderComponent, LoaderComponent, RouterModule,CommonModule],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: UserService) {}


  ngOnInit(): void {
    console.log('Authentication started');
    this.userService.getProfile().subscribe({
      next: () => {
        this.isAuthenticating = false;
        console.log('Profile loaded, isAuthenticating:', this.isAuthenticating);
      },
      error: (err) => {
        this.isAuthenticating = false;
        console.error('Error loading profile:', err);
      },
      complete: () => {
        console.log('Authentication process complete');
      },
    });
  }
  
  
}
