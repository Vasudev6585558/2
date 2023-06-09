import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/shared/api/authentication.guard';
import { uiroutes } from 'src/app/shared/common/ui-routes';
import { AddEditInstitutionComponent } from './components/add-edit-institution/add-edit-institution.component';

const routes: Routes = [
  {
    path: uiroutes.INSTITUTION_FORM_ROUTE.route,
    component: AddEditInstitutionComponent,
    canActivate: [AuthenticationGuard],
    data: uiroutes.INSTITUTION_FORM_ROUTE.auth,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionRoutingModule {}
