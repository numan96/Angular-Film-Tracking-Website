import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
  ],
  declarations: [AuthComponent],
})
export class AuthModule {}
