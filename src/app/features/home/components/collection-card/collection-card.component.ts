import { Component, Input } from '@angular/core';
import { Collection } from '../../../../core/models/collection.model';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss']
})
export class CollectionCardComponent {
  @Input() collection!: Collection;
  @Input() isCollector: boolean = false;

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
