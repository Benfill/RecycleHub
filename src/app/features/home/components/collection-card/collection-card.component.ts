import { Component, Input } from '@angular/core';
import { Collection, WasteType } from '../../../../core/models/collection.model';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.scss'
})
export class CollectionCardComponent {
  @Input() collectionData!: Collection;

  ngOnInit() {
    // Optional: Add validation
    if (!this.collectionData) {
      console.warn('Collection input is required for CollectionCardComponent');
    }
  }

  collection: Collection = {
    id: "123",
    type: WasteType.PLASTIC,
    picture: "url-to-picture.jpg",
    weight: 10,
    address: "123 Green Street",
    city: "Eco City",
    date: "2025-02-11",
    timeSlot: "09h00 - 18h00",
    note: "Please collect before noon",
    status: "pending" as const
  };

  getStatusColor(status: Collection['status']): string {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      occupied: 'bg-blue-100 text-blue-800',
      inProgress: 'bg-purple-100 text-purple-800',
      validated: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status];
  }
}
