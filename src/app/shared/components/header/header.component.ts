import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
constructor(private authService:AuthService, private userService: UserService){}

isAutenticated = this.authService.isLoggedIn();
currentUSer = this.isAutenticated ? this.userService.getCurrentUser() : null
}
