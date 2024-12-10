import { Component, OnInit } from '@angular/core';
import { FirebasePostService } from '../services/firebase-post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css',
})
export class PostsListComponent implements OnInit {
  posts: any[] = [];
  
  constructor(private postService: FirebasePostService) {}

  ngOnInit() {
    this.postService.getPost().subscribe(data => {
      this.posts = Object.keys(data).map(key => ({id: key, ...data[key]}));
    });
  };

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
      alert('Post deleted succesfully!');
    })
  }

 }


