import { Component } from '@angular/core';
import { Collection, WasteType } from '../../../../core/models/collection.model';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrl: './collection-list.component.scss'
})
export class CollectionListComponent {
  collectionData: Collection = {
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
}
