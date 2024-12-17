import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './types/post';
import { Theme } from './types/theme';
import { Car } from './types/car';
import { Observable } from 'rxjs';  
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // Съществуващи методи за постове и теми
  getPosts() {
    const { apiUrl } = environment;
    return this.http.get<Post[]>(`${apiUrl}/posts`);
  }

  getThemes() {
    return this.http.get<Theme[]>(`/api/themes`);
  }

  getPostById(postId: string): Observable<any> {
    return this.http.get<any>(`/api/posts/${postId}`);
  }

  createPost(postData: any): Observable<any> {
    return this.http.post<any>('/api/posts', postData);
  }

  getSingleTheme(id: string) {
    return this.http.get<Theme>(`/api/themes/${id}`);
  }

  createTheme(themeName: string, postText: string) {
    const payload = { themeName, postText };
    return this.http.post<Theme>(`/api/themes`, payload);
  }

  updateTheme(themeId: string, themeName: string, postText: string) {
    const payload = { themeName, postText };
    return this.http.put<Theme>(`/api/themes/${themeId}`, payload);
  }

  updatePost(themeId: string, postId: string) {
    const payload = {};
    return this.http.put<Theme>(`/api/themes/${themeId}/posts/${postId}`, payload);
  }

  deletePost(themeId: string, postId: string) {
    return this.http.delete(`/api/themes/${themeId}/posts/${postId}`);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('/api/posts');
  }

  addPost(postData: { title: string; content: string }): Observable<Post> {
    return this.http.post<Post>('/api/posts', postData);
  }

  getLatestPosts(limit: number = 0) {
    return this.http.get<Post[]>(`/api/posts?limit=${limit}`);
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>('/api/cars');
  }

  getCarDetails(carId: string): Observable<Car> {
    return this.http.get<Car>(`/api/cars/${carId}`);
  }

  // Добавяне на нови методи за коментари

  // Получаване на коментари за даден пост
  getComments(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/posts/${postId}/comments`);
  }

  getPost(postId: string): Observable<any> {
    return this.http.get<any>(`/api/posts/${postId}`);
  }
  

  // Добавяне на нов коментар към даден пост
  addComment(comment: { text: string; postId: string }): Observable<any> {
    return this.http.post<any>(`/api/posts/${comment.postId}/comments`, { text: comment.text });
  }
}
