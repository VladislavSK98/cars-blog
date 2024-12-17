import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../types/car';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private readonly apiUrl = '/api/cars';

  constructor(private http: HttpClient) {}

  getCarsByUser(userId: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/user/${userId}`);
  }

  getCarsByUserId(userId: string): Observable<Car[]> {
    return this.http.get<Car[]>(`/api/cars/user/${userId}`);
  }


  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  // updateCar(carId: string, updatedCar: Partial<Car>): Observable<Car> {
  //   return this.http.put<Car>(`${this.apiUrl}/${carId}`, updatedCar);
  // }

  deleteCar(carId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${carId}`);
  }

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Метод за харесване на кола
  likeCar(carId: string) {
    return this.http.put(`${this.apiUrl}/${carId}/like`, {}); 
  }

  getCarById(carId: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${carId}`);
  }
  
  updateCar(carId: string, updatedCar: Partial<Car>): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${carId}/edit`, updatedCar);
  }

  getCarDetails(carId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${carId}`);
  }
  
  
}
