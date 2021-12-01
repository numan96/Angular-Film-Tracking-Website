import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewfilmsComponent } from './viewfilms.component';
import { ViewfilmsItemComponent } from './viewfilms-item/viewfilms-item.component';
import { RouterModule } from '@angular/router';
import { ViewFilmsRoutingModule } from './viewfilms-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromViewFilms from './store/films.reducer';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ViewFilmsRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    StoreModule.forFeature('films', fromViewFilms.filmsReducer),
  ],
  declarations: [ViewfilmsComponent, ViewfilmsItemComponent],
})
export class ViewfilmsModule {}
