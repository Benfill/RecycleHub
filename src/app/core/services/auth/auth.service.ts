import { LocalStorageService } from './../local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService, private storage:LocalStorageService) {}

  login(email: string, password: string): Observable<User | null> {

    const user = this.userService.getUserByEmail(email);

    const nullObs$ = this.addObservableValue(null)
    if(!user) return nullObs$;
    else if (user.password !== password) return nullObs$

    this.storage.setItem("currentUser", JSON.stringify(user))
    return this.addObservableValue(user);
  }

  register(user:User): Observable<User | null> {
    const savedUser = this.userService.addUser(user);
    console.log(user);
    if(!savedUser) return this.addObservableValue(null);

    return this.addObservableValue(user);

  }

  // logout(): Observable<void> {



  // }

  isLoggedIn() {
    const user = this.storage.getItem("currentUser");

    if(!user) return false;

    return true;
  }

  addObservableValue(value:any):Observable<any> {
    return  new Observable(sub => {
      sub.next(value)
    });
  }
}
