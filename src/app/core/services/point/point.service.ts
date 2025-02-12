import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Point } from '../../models/point.model';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  private readonly POINTS_KEY = 'points';

  private readonly MATERIAL_POINTS = {
    plastic: 2,
    glass: 1,
    paper: 1,
    metal: 5
  };

  private readonly VOUCHER_TIERS = [
    { points: 500, value: 350 },
    { points: 200, value: 120 },
    { points: 100, value: 50 }
  ];

  constructor(private storage: LocalStorageService) {
    // Initialize points storage if not exists
    if (!this.storage.getItem(this.POINTS_KEY)) {
      this.storage.setItem(this.POINTS_KEY, JSON.stringify([]));
    }
  }

  calculatePoints(material: string, weight: number): number {
    const pointsPerKg = this.MATERIAL_POINTS[material.toLowerCase() as keyof typeof this.MATERIAL_POINTS] || 0;
    return Math.floor(pointsPerKg * weight);
  }

  calculateVoucherValue(points: number): number {
    const qualifyingTier = this.VOUCHER_TIERS.find(tier => points >= tier.points);
    return qualifyingTier?.value || 0;
  }

  calculateRemainingPoints(totalPoints: number): number {
    const qualifyingTier = this.VOUCHER_TIERS.find(tier => totalPoints >= tier.points);
    if (!qualifyingTier) return totalPoints;
    return totalPoints % qualifyingTier.points;
  }

  getUserPoints(userId: string): Observable<Point | null> {
    const points = this.storage.getItem(this.POINTS_KEY) || [];
    const userPoints = points.find((p: Point) => p.user.id === userId);
    return of(userPoints || null);
  }

  addPoints(user: User, material: string, weight: number): Observable<Point> {
    const earnedPoints = this.calculatePoints(material, weight);
    const points: Point[] = this.storage.getItem(this.POINTS_KEY) || [];

    let userPoints = points.find(p => p.user.id === user.id);

    if (userPoints) {
      const newBalance = userPoints.balance + earnedPoints;
      userPoints.balance = newBalance;
      userPoints.equivalentVoucher = this.calculateVoucherValue(newBalance);
      userPoints.convertedPoints = this.calculateRemainingPoints(newBalance);

      const updatedPoints = points.map(p =>
        p.user.id === user.id ? userPoints! : p
      );

      this.storage.setItem(this.POINTS_KEY, JSON.stringify(updatedPoints));
      return of(userPoints);
    } else {
      const newPoints: Point = {
        id: crypto.randomUUID(),
        user: user,
        balance: earnedPoints,
        convertedPoints: this.calculateRemainingPoints(earnedPoints),
        equivalentVoucher: this.calculateVoucherValue(earnedPoints)
      };

      points.push(newPoints);
      this.storage.setItem(this.POINTS_KEY, JSON.stringify(points));
      return of(newPoints);
    }
  }

  getAllPoints(): Observable<Point[]> {
    const points = this.storage.getItem(this.POINTS_KEY) || [];
    return of(points);
  }

  convertPointsToVoucher(userId: string): Observable<{success: boolean, voucher: number, remainingPoints: number}> {
    const points: Point[] = this.storage.getItem(this.POINTS_KEY) || [];
    const userPoints = points.find(p => p.user.id === userId);

    if (!userPoints || userPoints.balance < 100) {
      return of({ success: false, voucher: 0, remainingPoints: userPoints?.balance || 0 });
    }

    const voucherValue = this.calculateVoucherValue(userPoints.balance);
    const remainingPoints = this.calculateRemainingPoints(userPoints.balance);

    userPoints.balance = remainingPoints;
    userPoints.convertedPoints = remainingPoints;
    userPoints.equivalentVoucher = this.calculateVoucherValue(remainingPoints);

    const updatedPoints = points.map(p =>
      p.user.id === userId ? userPoints : p
    );

    this.storage.setItem(this.POINTS_KEY, JSON.stringify(updatedPoints));

    return of({
      success: true,
      voucher: voucherValue,
      remainingPoints: remainingPoints
    });
  }

  resetPoints(userId: string): Observable<boolean> {
    const points: Point[] = this.storage.getItem(this.POINTS_KEY) || [];
    const updatedPoints = points.map(p => {
      if (p.user.id === userId) {
        return {
          ...p,
          balance: 0,
          convertedPoints: 0,
          equivalentVoucher: 0
        };
      }
      return p;
    });

    this.storage.setItem(this.POINTS_KEY, JSON.stringify(updatedPoints));
    return of(true);
  }
}
