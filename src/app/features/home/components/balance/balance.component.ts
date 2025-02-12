import { Component, OnInit } from '@angular/core';
import { PointService } from '../../../../core/services/point/point.service';
import { UserService } from '../../../../core/services/user/user.service';
import { Point } from '../../../../core/models/point.model';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  userPoints: Point | null = null;
  loading = true;
  error = '';

  constructor(
    private pointService: PointService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUserPoints();
  }

  loadUserPoints() {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.pointService.getUserPoints(user.id).subscribe(points => {
          this.userPoints = points;
          this.loading = false;
        });
      } else {
        this.error = 'User not found';
        this.loading = false;
      }
    });
  }

  convertToVoucher() {
    if (!this.userPoints?.user.id) return;

    this.pointService.convertPointsToVoucher(this.userPoints.user.id).subscribe(result => {
      if (result.success) {
        this.loadUserPoints(); // Reload points after conversion
      }
    });
  }
}
