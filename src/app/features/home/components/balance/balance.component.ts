import { Component } from '@angular/core';
import { Point } from '../../../../core/models/point.model';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss'
})
export class BalanceComponent {
  user: Partial<User> = { id: "EFKEFKEFK", firstName: 'John Doe' } // Not displayed
  pointData: Point = {
    id: "efkjkefje",
    user: this.user as User,
    balance: 750, // Example points balance
    convertedPoints: 500, // Example converted points
    equivalentVoucher: 350, // Example voucher value
  };
}
