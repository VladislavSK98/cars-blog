import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,  
    HeaderComponent,
    FooterComponent,
    AuthenticateComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],  
})
export class AppComponent implements OnInit {

  ngOnInit() {
    initializeApp(firebaseConfig); 
  }
}
