import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewFilmsResolverService } from './viewfilms-resolver.service';
import { ViewfilmsComponent } from './viewfilms.component';

const routes: Routes = [
  {
    path: '',
    component: ViewfilmsComponent,
    resolve: [ViewFilmsResolverService],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFilmsRoutingModule {}
