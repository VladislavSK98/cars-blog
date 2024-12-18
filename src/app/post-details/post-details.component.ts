import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Post } from '../types/post'

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post: any;
  comments: any[] = [];
  commentText: string = '';
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.getPost(postId);
      this.loadComments(postId);
    }
  }

  getPost(postId: string): void {
    this.apiService.getPost(postId).subscribe({
      next: (post: Post) => {
        this.post = post;
      },
      error: (err) => {
        console.error('Error fetching post:', err);
      },
    });
  }

  loadComments(postId: string): void {
    this.apiService.getComments(postId).subscribe(comments => {
      this.comments = comments;
    });
  }

  onSubmitComment(): void {
    const userId = this.userService.getCurrentUserId(); 
  
    if (!userId) {
      this.errorMessage = 'You must be logged in to submit a comment.';
      return; 
    }
  
    if (!this.commentText.trim()) {
      this.errorMessage = 'Comment cannot be empty.';
      return;
    }
  
    const commentData = {
      text: this.commentText,
      postId: this.post._id,
      userId: userId,
    };
  
    this.apiService.addComment(commentData).subscribe({
      next: (response) => {
        this.comments.push(response);
        this.commentText = ''; 
        this.errorMessage = ''; 
        this.cdRef.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Failed to submit comment.';
        console.error(err);
      },
    });
  }
  
  
  
}