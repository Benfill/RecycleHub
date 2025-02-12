import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Collection } from '../../../../core/models/collection.model';
import { CollectionService } from '../../../../core/services/collection/collection.service';
import { UserService } from '../../../../core/services/user/user.service';
import { PointService } from '../../../../core/services/point/point.service';
import { generateId } from '../../../../shared/utils/generateId';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Point } from '../../../../core/models/point.model';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.scss']
})
export class CollectionFormComponent implements OnInit {
  collectionForm: FormGroup;
  loading = false;
  error = '';
  wasteTypes = ['PLASTIC', 'PAPER', 'GLASS', 'METAL'];

  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionService,
    private userService: UserService,
    private pointService: PointService,
    private router: Router
  ) {
    this.collectionForm = this.fb.group({
      type: [[], Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      note: [''],
      picture: [null]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.collectionForm.invalid) return;

    this.loading = true;
    const formValue = this.collectionForm.value;

    this.userService.getCurrentUser().pipe(
      switchMap(user => {
        if (!user) {
          throw new Error('User not found');
        }

        // Create collection
        const collection: Collection = {
          id: generateId(),
          type: formValue.type,
          picture: formValue.picture,
          weight: formValue.weight,
          address: formValue.address,
          city: formValue.city,
          date: formValue.date,
          timeSlot: `${formValue.startTime}-${formValue.endTime}`,
          note: formValue.note || null,
          status: 'pending',
          user: user
        };

        // Add collection
        const success = this.collectionService.addCollection(collection);
        if (!success) {
          throw new Error('Failed to add collection');
        }

        // Add points if collection is validated
        if (collection.status === 'validated') {
          return this.pointService.addPoints(
            user,
            formValue.type,
            formValue.weight
          );
        }

        // Initialize points with 0 if not already exists
        return this.pointService.getUserPoints(user.id).pipe(
          switchMap(existingPoints => {
            if (!existingPoints) {
              return this.pointService.addPoints(user, formValue.type, 0);
            }
            return of(existingPoints); // Convert Point to Observable<Point>
          })
        );
      })
    ).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/home/collections']);
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = err.message || 'Failed to submit collection';
        this.loading = false;
      }
    });
  }
}
