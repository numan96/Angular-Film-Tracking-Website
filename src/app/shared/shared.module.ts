import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NavComponent } from './nav/nav.component';
import { SearchComponent } from './search/search.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    FooterComponent,
    LoadingSpinnerComponent,
    NavComponent,
    SearchComponent,
  ],
  exports: [
    FooterComponent,
    LoadingSpinnerComponent,
    NavComponent,
    SearchComponent,
  ],
})
export class SharedModule {}
