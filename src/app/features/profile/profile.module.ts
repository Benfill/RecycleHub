import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profil.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';


const routes:Routes = [
  {
    path: '',
    component: ProfileComponent
  }
]

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfilModule { }
