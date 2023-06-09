import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/shared/api/authorization/authorization.service';
import { defaultSearchParams } from 'src/app/shared/common/constants';
import {
  MembershipStatusOptions,
  resources,
  RESOURCE_ACTIONS,
  User,
  UserRole,
} from 'src/app/shared/common/models';
import {
  ApproveMemberAction,
  SuspendMemberAction,
} from 'src/app/modules/dashboard/modules/admin/modules/member/state/member.actions';
import { ShowNotificationAction } from 'src/app/shared/state/notifications/notification.actions';
import { UserRoleState } from '../../../../user-role/state/userRole.state';
import { FetchUserRolesAction } from '../../../../user-role/state/userRole.actions';

@Component({
  selector: 'app-user-moderation-profile',
  templateUrl: './user-moderation.component.html',
  styleUrls: [
    './user-moderation.component.scss',
    './../../../../../../../../../shared/common/shared-styles.css',
  ],
})
export class UserModerationProfileComponent implements OnInit {
  resource = resources.MODERATION;
  resourceActions = RESOURCE_ACTIONS;
  profileData: any = {};
  moderationForm: FormGroup;
  @Select(UserRoleState.listRoleOptions)
  roleOptions$: Observable<UserRole[]>;
  roleOptions;
  @Select(UserRoleState.isFetching)
  isFetchingUserRoles$: Observable<boolean>;
  isFetchingUserRoles: boolean;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserModerationProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
    private fb: FormBuilder,
    private auth: AuthorizationService
  ) {
    this.roleOptions$.subscribe((val) => {
      this.roleOptions = val;
    });
    this.profileData = data;
    this.moderationForm = this.setupModerationFormGroup(this.profileData);
  }

  ngOnInit() {
    this.store.dispatch(
      new FetchUserRolesAction({ searchParams: defaultSearchParams })
    );
  }

  authorizeResourceMethod(action) {
    return this.auth.authorizeResource(this.resource, action, {
      institutionId: this.profileData?.institution?.id,
    });
  }

  disableApproval() {
    return (
      this.profileData?.membershipStatus ==
      MembershipStatusOptions.UNINITIALIZED
    );
  }

  setupModerationFormGroup = (user): FormGroup => {
    const formGroup = this.fb.group({
      role: [user?.role?.name],
      remarks: [],
    });
    return formGroup;
  };

  closeDialog(): void {
    this.dialogRef.close();
  }

  approvalConfirmation() {
    const roleValue = this.moderationForm.get('role').value;
    if (roleValue) {
      const roleOption = this.roleOptions.find((r) => r.value == roleValue);
      const roleName = roleOption.label;
      const dialogRef = this.dialog.open(UserApprovalConfirmationDialog, {
        data: { ...this.profileData, role: { id: roleValue, name: roleName } },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == true) {
          this.approveUser();
        }
      });
    } else {
      this.store.dispatch(
        new ShowNotificationAction({
          message: 'Please select role before attempting to approve.',
          action: 'error',
        })
      );
    }
  }
  approveUser() {
    this.store.dispatch(
      new ApproveMemberAction({
        userId: this.profileData.id,
        roleName: this.moderationForm.get('role').value,
      })
    );

    this.closeDialog();
  }

  denialConfirmation() {
    if (this.moderationForm.get('remarks').value) {
      const dialogRef = this.dialog.open(UserDenialConfirmationDialog, {
        data: this.profileData,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == true) {
          this.denyUser();
        }
      });
    } else {
      this.store.dispatch(
        new ShowNotificationAction({
          message: 'Please add a remark before attempting to deny.',
          action: 'error',
        })
      );
    }
  }
  denyUser() {
    this.store.dispatch(
      new SuspendMemberAction({
        userId: this.profileData.id,
        remarks: this.moderationForm.get('remarks').value,
      })
    );
    this.closeDialog();
  }
}

@Component({
  selector: 'user-approval-confirmation-dialog',
  templateUrl: 'approval-confirmation-dialog.html',
})
export class UserApprovalConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<UserApprovalConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}
}

@Component({
  selector: 'user-denial-confirmation-dialog',
  templateUrl: 'denial-confirmation-dialog.html',
})
export class UserDenialConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<UserApprovalConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}
}
