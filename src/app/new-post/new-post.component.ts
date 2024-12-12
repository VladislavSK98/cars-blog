import { Component, } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  title = '';
  content = '';

  constructor(private apiService: ApiService, private router: Router) {}

  createPost() {
    if (this.title && this.content) {
      this.apiService
        .addPost({ title: this.title, content: this.content })
        .subscribe(() => {
          this.router.navigate(['/blog']);
        });
    }
  }
}
