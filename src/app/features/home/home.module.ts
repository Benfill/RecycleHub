import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CollectionCardComponent } from './components/collection-card/collection-card.component';
import { CollectionFormComponent } from './components/collection-form/collection-form.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { BalanceComponent } from './components/balance/balance.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes:Routes = [
  {
    path: '',
    redirectTo: 'collections',
    pathMatch: 'full' // Ensures the empty path redirects properly
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'form',
        component: CollectionFormComponent
      },
      {
        path: 'collections',
        component: CollectionCardComponent
      },
      {
        path: 'balance',
        component: BalanceComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    CollectionCardComponent,
    CollectionFormComponent,
    CollectionListComponent,
    BalanceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
