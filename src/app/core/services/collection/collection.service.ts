import { Collection } from './../../models/collection.model';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private readonly COLLECTIONS_KEY = 'collections';

  constructor(private storage: LocalStorageService) { }

  getAll(): Observable<Collection[]> {
    const collections = this.storage.getItem(this.COLLECTIONS_KEY);
    return of(collections || []);
  }

  getCollectionObs(id: string): Observable<Collection | null> {
    return of(this.getCollection(id));
  }

  private getCollection(id: string): Collection | null {
    const collections = this.storage.getItem(this.COLLECTIONS_KEY);
    if (!collections) return null;

    return collections.find((c: { id: string; }) => c.id === id) || null;
  }

  addCollection(collection: Collection): boolean {
    try {
      const collections = this.storage.getItem(this.COLLECTIONS_KEY) || [];

      // Check if ID already exists
      if (collections.some((c: { id: string; }) => c.id === collection.id)) {
        return false;
      }

      collections.push(collection);
      this.storage.setItem(this.COLLECTIONS_KEY, JSON.stringify(collections));
      return true;
    } catch (error) {
      console.error('Error adding collection:', error);
      return false;
    }
  }

  updateCollection(collection: Collection): boolean {
    try {
      const collections = this.storage.getItem(this.COLLECTIONS_KEY) || [];
      const index = collections.findIndex((c: { id: string; }) => c.id === collection.id);

      if (index === -1) return false;

      collections[index] = collection;
      this.storage.setItem(this.COLLECTIONS_KEY, JSON.stringify(collections));
      return true;
    } catch (error) {
      console.error('Error updating collection:', error);
      return false;
    }
  }

  deleteCollection(id: string): boolean {
    try {
      const collections = this.storage.getItem(this.COLLECTIONS_KEY);
      if (!collections) return false;

      const filteredCollections = collections.filter((c: { id: string; }) => c.id !== id);
      this.storage.setItem(this.COLLECTIONS_KEY, JSON.stringify(filteredCollections));
      return true;
    } catch (error) {
      console.error('Error deleting collection:', error);
      return false;
    }
  }

  private checker(id: string): boolean {
    return this.getCollection(id) !== null;
  }
}
