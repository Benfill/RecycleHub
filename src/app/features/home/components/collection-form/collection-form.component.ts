import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Collection } from '../../../../core/models/collection.model';
import { generateId } from '../../../../shared/utils/generateId';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrl: './collection-form.component.scss'
})
export class CollectionFormComponent implements OnInit {
  collectionForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.collectionForm = this.fb.group({
      type: ['PLASTIC', Validators.required],
      weight: [null, [Validators.required, Validators.min(0)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      date: ['', Validators.required],
      note: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.collectionForm!.valid) {
      const timeSlot = this.collectionForm.value.startTime + this.collectionForm.value.endTime;
      const collectionRequest: Collection = {
        id: generateId(),
        type: this.collectionForm.value.type,
        picture: null,
        weight: this.collectionForm.value.weight,
        address: this.collectionForm.value.address,
        city: this.collectionForm.value.city,
        date: this.collectionForm.value.date,
        note: this.collectionForm.value.note,
        status: 'pending',
        timeSlot
      };

      console.log('Collection Request:', collectionRequest);
      // You can now send this data to your backend or handle it as needed
    }
  }
}
