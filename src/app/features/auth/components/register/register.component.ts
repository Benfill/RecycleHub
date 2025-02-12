import { User } from './../../../../core/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { register } from '../../../../core/store/auth/auth.actions';
import { generateId } from '../../../../shared/utils/generateId';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      picture: [null],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // getFilePath(file) {

  // }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    // Add subscription to handle registration states
    // this.store.select(state => state['auth']).subscribe((authState: any) => {
    //   this.isLoading = authState.loading;
    //   this.error = authState.error;

    //   if (authState.error) {
    //     this.isLoading = false;
    //   }
    // });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    // Create a new object instead of modifying the form value directly
    const user: Partial<User> = {
      ...this.registerForm.value,
      id: generateId()
    };

    this.store.dispatch(register({ user: user as User }));
  }
}
