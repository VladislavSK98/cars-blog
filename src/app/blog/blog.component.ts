import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';  
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true, 
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getLatestPosts(10).subscribe(posts => {
      this.posts = posts;
    });
  }
}
