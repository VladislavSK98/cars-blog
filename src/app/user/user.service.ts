import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User as FirebaseUser } from 'firebase/auth';
import { getDatabase, ref, set, get, update } from 'firebase/database';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();
  private userSubscription: Subscription | null = null;
  private auth = getAuth();  // Firebase Authentication

  constructor() {
    this.userSubscription = this.user$.subscribe((user) => {
      if (user) {
        // Логика за зареждане на профила или други действия
      }
    });
  }

  get isLogged(): boolean {
    return !!this.user$$.value;
  }

  // Вход с email и парола
  login(email: string, password: string): Observable<FirebaseUser> {
    return new Observable((observer) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.setUser(user);
          observer.next(user);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  // Регистрация с email и парола
  register(username: string, email: string, tel: string, password: string, rePassword: string): Observable<FirebaseUser> {
    if (password !== rePassword) {
      throw new Error('Passwords do not match');
    }

    return new Observable((observer) => {
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.setUser(user);

          // Записване на допълнителни данни в Firebase Realtime Database
          const db = getDatabase();
          set(ref(db, 'users/' + user.uid), {
            username,
            email,
            tel,
          })
            .then(() => {
              observer.next(user);
              observer.complete();
            })
            .catch((error) => observer.error(error));
        })
        .catch((error) => observer.error(error));
    });
  }

  // Изход от системата
  logout(): Observable<void> {
    return new Observable((observer) => {
      signOut(this.auth)
        .then(() => {
          this.user$$.next(null);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  // Получаване на профил от Firebase
  // getProfile(): Observable<any> {
  //   const user = this.user$$.value;
  //   if (!user) {
  //     throw new Error('User not logged in');
  //   }

  //   const db = getDatabase();
  //   const userRef = ref(db, 'users/' + user.uid);
  //   return new Observable((observer) => {
  //     get(userRef)
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           const data = snapshot.val();
  //           observer.next(data);
  //           observer.complete();
  //         } else {
  //           observer.error('No data available');
  //         }
  //       })
  //       .catch((error) => observer.error(error));
  //   });
  // }

  getProfile(): Observable<any> {
    const user = this.user$$.value;
    if (!user) {
      return new Observable((observer) => {
        observer.error(new Error('No user logged in.'));
      });
    }
  
    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.uid);
    return new Observable((observer) => {
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            observer.next(data);
            observer.complete();
          } else {
            observer.error('No data available');
          }
        })
        .catch((error) => observer.error(error));
    });
  }
  

  get user(): UserForAuth | null {
    return this.user$$.value; // Това ще върне текущия потребител от BehaviorSubject
  }

  // Актуализиране на профил
  updateProfile(username: string, email: string, tel?: string): Observable<void> {
    const user = this.user$$.value;
    if (!user) {
      throw new Error('User not logged in');
    }

    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.uid);
    return new Observable((observer) => {
      update(userRef, { username, email, tel })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  // Функция за задаване на потребителски данни в BehaviorSubject
  private setUser(firebaseUser: FirebaseUser) {
    this.user$$.next({
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      username: '', // По желание може да се попълни по време на регистрация
      password: '', // Паролата не се съхранява за безопасност
      tel: '', // Може да добавите телефон по време на регистрация
    });
  }

  // При унищожаване на сервиса прекратяваме наблюдението
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
