import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  postData = {
    title: '',
    text: '',
    author: 'User',  
  };

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    this.apiService.createPost(this.postData).subscribe(() => {
      this.router.navigate(['/blog']);
    });
  }
}
