import { Component, OnInit } from '@angular/core';
import { FirebasePostService } from '../services/firebase-post.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  imports: [FormsModule, RouterModule],
  standalone: true,
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreateListComponent  {
  newPost = {title: '', content: ''};

  constructor(private postService: FirebasePostService) {}

  onSubmit() {
    const postId = Date.now().toString();
    this.postService.createPost(postId, this.newPost.title, this.newPost.content)
      .subscribe(()=> {
        alert('Post submitted succesfully!');
        this.newPost = { title: '', content: ''};
      });
  }
}
