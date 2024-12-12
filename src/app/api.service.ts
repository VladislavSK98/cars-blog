import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './types/post';
import { Theme } from './types/theme';
import { Car } from './types/car';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  
  getCars() {
    return this.http.get<Car[]>('/api/cars'); 
  }

  addCar(car: Car) {
    return this.http.post<Car>('/api/cars', car);  
  }

  getPosts(limit?: number) {
    let url = `/api/posts`;
    if (limit) {
      url += `?limit=${limit}`;
    }

    return this.http.get<Post[]>(url);
  }

  getThemes() {
    return this.http.get<Theme[]>(`/api/themes`);
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

  getCarsByUser(userId: string): Observable<Car[]> {
    return this.http.get<Car[]>(`/api/cars/${userId}`);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('/api/posts');
  }
  
  addPost(postData: { title: string; content: string }): Observable<Post> {
    return this.http.post<Post>('/api/posts', postData);
  }
  
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>('/api/cars');
  }
  
  getCarDetails(carId: string): Observable<Car> {
    return this.http.get<Car>(`/api/cars/${carId}`);
}

}
