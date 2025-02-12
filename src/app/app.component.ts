import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthInitializationService } from './core/services/auth/auth-initialization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'RecycleHub';

  constructor(private authInitService: AuthInitializationService) {}

  ngOnInit() {
    this.authInitService.initializeAuth();
  }
}
