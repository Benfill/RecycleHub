import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ProfilModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    ProfilModule,
    AuthModule
  ]
})
export class FeaturesModule { }
