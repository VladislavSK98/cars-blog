import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Post } from '../types/post'

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post: any;
  comments: any[] = [];
  commentText: string = '';

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.loadPost(postId);
      this.loadComments(postId);
    }
  }

  loadPost(postId: string): void {
    this.apiService.getPost(postId).subscribe((post: Post) => {
      this.post = post;
    });
  }

  loadComments(postId: string): void {
    this.apiService.getComments(postId).subscribe(comments => {
      this.comments = comments;
    });
  }

  onSubmitComment(): void {
    if (this.commentText.trim()) {
      const commentData = {
        text: this.commentText,
        postId: this.post._id,
        userId: this.userService.getUser()
      };

      this.apiService.addComment(commentData).subscribe(
        (response) => {
          this.comments.push(response);
          this.commentText = '';
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }
}