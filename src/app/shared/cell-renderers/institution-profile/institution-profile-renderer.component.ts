import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { ICellRendererParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { InstitutionModalComponent } from 'src/app/pages/modals/institution-modal/institution-modal.component';
import { AuthorizationService } from '../../api/authorization/authorization.service';
import {
  CurrentMember,
  resources,
  RESOURCE_ACTIONS,
} from '../../common/models';
import { AuthState } from '../../state/auth/auth.state';

@Component({
  selector: 'app-institution-profile',
  templateUrl: './institution-profile-renderer.component.html',
  styleUrls: ['./institution-profile-renderer.component.scss'],
})
export class InstitutionProfileRendererComponent {
  cellValue: string;
  rowData: any;
  params: any;
  resource = resources.USER_ROLE;
  resourceActions = RESOURCE_ACTIONS;
  @Select(AuthState.getCurrentMember)
  currentMember$: Observable<CurrentMember>;
  currentMember: CurrentMember;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.rowData = params.data;
    this.cellValue = this.getValueToDisplay(params);
    this.currentMember$.subscribe((val) => {
      this.currentMember = val;
    });
  }

  showProfile() {}

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  constructor(public dialog: MatDialog, private auth: AuthorizationService) {}

  authorizeResourceMethod(action) {
    return this.auth.authorizeResource(this.resource, action, {
      institutionId: this.rowData.id,
    });
  }

  public invokeParentMethod() {
    if (this.authorizeResourceMethod(this.resourceActions.GET)) {
      this.params.context.componentParent.openInstitutionProfile(this.rowData);
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(InstitutionModalComponent, {
      data: this.rowData,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
