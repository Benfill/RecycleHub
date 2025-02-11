import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { map, Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStorageService:LocalStorageService) { }

  getUsers():Observable<User[] | null> {
    const users = new Observable<User[]>((subscriber) => {
      subscriber.next(this.localStorageService.getItem('users'))
    })
    return users
  }

  getCurrentUser(): Observable<User | null> {
    const user$ = new Observable<User>((subscriber) => {
      subscriber.next(this.localStorageService.getItem('currentUser'))
    })
    return user$;
  }

  addUser(user:User):boolean {
    if(!this.getUserByEmail(user.email)) return false

    const users$ = this.getUsers()

    users$.subscribe(pipe(users => {
      if(users !== null) users.push(user)
      else users = [user]
      this.localStorageService.setItem('users', JSON.stringify(users))
    }))

    return true;
  }

  updateUser(user:User):boolean {
    if(!this.getUser(user.id)) return false

    this.removeUser(user.id)
    this.addUser(user)
    return true;
  }

  removeUser(id:string):boolean {
    let checker = false;
    if(!this.getUser(id)) return checker

    let users$ = this.getUsers()
    users$.subscribe(pipe(users => {
      if(users)
        users = users.filter(user => user.id !== id)
      checker = true
      this.localStorageService.setItem('users', JSON.stringify(users))
    }))
    return checker
  }

  private getUser(id:String) {
    const users$ = this.getUsers()

    let user:User | null = null
    users$.subscribe(pipe(users => {
      if(users)
        user = users.filter(u => u.id === id)[0];
    }))
    return user;
  }

  isCollector(): boolean {
    const user = this.getCurrentUser();
    let checker = false;

    user.subscribe(pipe(u => {
      checker = u?.type === "collector" || false
    }))
    return checker;
  }

  getUserByEmail(email:String): User | null {
    const users$ = this.getUsers()

    let user:User | null = null
    users$.subscribe(pipe(users => {
      if(users)
        user = users.filter(u => u.email === email)[0];
    }))
    return user;
  }
}
