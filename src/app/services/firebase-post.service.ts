import { Injectable } from "@angular/core";
import { Database, ref, set, get, update, remove } from "@angular/fire/database";
import { Observable, from } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FirebasePostService {
  constructor(private db: Database) {}

  // Създаване на нова публикация
  createPost(postId: string, title: string, content: string): Observable<void> {
    return from(set(ref(this.db, 'posts/' + postId), { title, content }));
  }

  // Получаване на всички публикации
  getPost(): Observable<any> {
    return from(get(ref(this.db, 'posts')));
  }

  // Обновяване на съществуваща публикация
  updatePost(postId: string, title: string, content: string): Observable<void> {
    return from(update(ref(this.db, 'posts/' + postId), { title, content }));
  }

  // Изтриване на публикация
  deletePost(postId: string): Observable<void> {
    return from(remove(ref(this.db, 'posts/' + postId)));
  }

  // Създаване на нова тема
  createTheme(themeName: string, postText: string): Observable<void> {
    const themeId = Date.now().toString();  // Използваме timestamp за уникален ID
    return from(set(ref(this.db, 'themes/' + themeId), { themeName, postText }));
  }

  // Получаване на всички теми
  getThemes(): Observable<any> {
    return from(get(ref(this.db, 'themes')));
  }

  // Получаване на една тема по ID
  getSingleTheme(themeId: string): Observable<any> {
    return from(get(ref(this.db, 'themes/' + themeId)));
  }

  // Обновяване на съществуваща тема
  updateTheme(themeId: string, themeName: string, postText: string): Observable<void> {
    return from(update(ref(this.db, 'themes/' + themeId), { themeName, postText }));
  }

  // Изтриване на тема
  deleteTheme(themeId: string): Observable<void> {
    return from(remove(ref(this.db, 'themes/' + themeId)));
  }

  getCars(): Observable<any> {
    return from(get(ref(this.db, 'cars/')));
  }
}
