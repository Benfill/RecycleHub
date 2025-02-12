import { LocalStorageService } from './../local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../user/user.service';
import { generateId } from '../../../shared/utils/generateId';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  constructor(private userService: UserService, private localStorage: LocalStorageService, private router:Router) {}

  login(email: string, password: string): Observable<User | null> {

    const users: User[] = JSON.parse(localStorage.getItem("users") || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.router.navigate(['/']);
      return of(user);
    }
    return of(null);
  }

  register(user: User): Observable<User> {
    // You might want to remove sensitive information before storing
    const userToStore = { ...user };
    return of(userToStore);
  }

  logout(): void {
    this.localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.localStorage.getItem('user');
  }

  getCurrentUser(): User | null {
    return this.localStorage.getItem('user');
  }

  addObservableValue(value:any):Observable<any> {
    return  new Observable(sub => {
      sub.next(value)
    });
  }

  private getUsers(): User[] {
    const usersJson = localStorage.getItem("users");
    return usersJson ? JSON.parse(usersJson) : [];
  }

  checkUserExists(email: string): Observable<boolean> {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    return of(users.some(user => user.email === email));
  }
}
