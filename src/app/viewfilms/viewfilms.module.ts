import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ],
  declarations: [
    ViewfilmsComponent,
    ViewfilmsItemComponent,
    ViewfilmsDetailComponent,
  ],
})
export class ViewfilmsModule {}
