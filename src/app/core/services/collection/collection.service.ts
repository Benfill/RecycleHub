import { Collection } from './../../models/collection.model';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable, pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private storage:LocalStorageService) { }

  getAll(): Observable<Collection[] | null> {
    return new Observable(subscriber => {
      subscriber.next(this.storage.getItem("collections"));
    });
  }

  getCollectionObs(id:string):Observable<Collection | null> {
    const collection = this.getCollection(id);
    return new Observable(sub => {
      sub.next(collection)
    });
  }

  private getCollection(id:string): Collection | null {
    const collections$ = this.getAll();
    let collection:Collection | null = null
    collections$.subscribe(pipe(collections => {
      if(collections)
        collection = collections?.filter(c => c.id === id)[0];
    }))
    return collection;
  }

  addCollection(collection:Collection):boolean {
    if(!this.checker(collection.id)) return false

    const collections$ = this.getAll()

    collections$.subscribe(pipe(collections => {
      if(collections !== null) collections.push(collection)
      else collections = [collection]
      this.storage.setItem('collections', JSON.stringify(collections))
    }))

    return true;
  }

  updateCollection(id: string):boolean {
    let checker = this.checker(id);
    if(!checker) return checker;

    this.deleteCollection(id);
    this.addCollection(this.getCollection(id)!)
    return true;
  }

  deleteCollection(id: string):boolean {
    let checker = this.checker(id);
    if(!checker) return checker;

    const collections$ = this.getAll();
    collections$.subscribe(pipe(collections => {
      if(collections)
        collections = collections.filter(c => c.id !== id)
      checker = true
      this.storage.setItem('collections', JSON.stringify(collections))
    }))

    return checker;
  }

  private checker(id:string): boolean{
    if(this.getCollection(id)) return true;
    else return false
  }
}
