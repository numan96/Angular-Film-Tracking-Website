import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewfilmsComponent } from './viewfilms.component';
import { ViewfilmsItemComponent } from './viewfilms-item/viewfilms-item.component';
import { RouterModule } from '@angular/router';
import { ViewFilmsRoutingModule } from './viewfilms-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ViewfilmsDetailComponent } from './viewfilms-detail/viewfilms-detail.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { EffectsModule } from '@ngrx/effects';
import { FilmsEffects } from './store/films.effects';
import { AuthEffects } from '../auth/store/auth.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import * as fromViewFilms from './store/films.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
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
    YouTubePlayerModule,
    MatChipsModule,
    MatTooltipModule,
    MatGridListModule,
    EffectsModule.forFeature([AuthEffects, FilmsEffects]),
  ],
  declarations: [
    ViewfilmsComponent,
    ViewfilmsItemComponent,
    ViewfilmsDetailComponent,
  ],
  providers: [DatePipe],
})
export class ViewfilmsModule {}
