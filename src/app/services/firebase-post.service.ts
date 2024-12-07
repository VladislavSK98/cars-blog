import { Injectable } from "@angular/core";
import {Database, ref, set, get, update, remove, } from "@angular/fire/database";
import { Observable, from } from "rxjs";

@Injectable({providedIn: 'root'})
export class FirebasePostService {
    constructor(private db: Database) {}

    createCar(carId: string, make: string, model: string, year: Number, power: Number, image: string): Observable<void> {
        return from (set(ref(this.db, 'cars/' + carId), {make, model}));
    }

    getCar(): Observable<any> {
        return from (get(ref(this.db, 'cars')));
    }

    updateCar(carId: string, make: string, model: string, year: Number, power: Number, image: string): Observable<void> {
        return from (set(ref(this.db, 'cars/' + carId), {make, model}));
    }

    deleteCar(carId: string): Observable <void> {
        return from (remove(ref(this.db, 'cars/' + carId)))
    }

}