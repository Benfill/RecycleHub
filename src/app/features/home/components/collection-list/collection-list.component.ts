import { Component, OnInit } from '@angular/core';
import { Collection } from '../../../../core/models/collection.model';
import { CollectionService } from '../../../../core/services/collection/collection.service';
import { UserService } from '../../../../core/services/user/user.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {
  collections: Collection[] = [];
  loading = true;
  error = '';
  isCollector = false;

  constructor(
    private collectionService: CollectionService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isCollector = this.userService.isCollector();
    this.loadCollections();
  }

  loadCollections() {
    this.loading = true;
    this.error = '';

    if (this.isCollector) {
      // Show all collections for collectors
      this.collectionService.getAll().subscribe({
        next: (collections) => {
          this.collections = collections;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load collections';
          this.loading = false;
          console.error('Error loading collections:', err);
        }
      });
    } else {
      // For regular users, get their collections
      this.userService.getCurrentUser()
        .pipe(
          switchMap(user => {
            if (!user) {
              throw new Error('User not found');
            }
            return this.collectionService.getAll().pipe(
              map(collections => collections.filter(c => c.user?.id === user.id))
            );
          }),
          catchError(error => {
            console.error('Error:', error);
            this.error = error.message || 'Failed to load collections';
            return of([]);
          })
        )
        .subscribe({
          next: (collections) => {
            this.collections = collections;
            this.loading = false;
          },
          error: (err) => {
            this.error = 'Failed to load collections';
            this.loading = false;
            console.error('Error loading collections:', err);
          }
        });
    }
  }

  getStatusClass(status: string): string {
    const statusClasses = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'occupied': 'bg-blue-100 text-blue-800',
      'inProgress': 'bg-purple-100 text-purple-800',
      'validated': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
