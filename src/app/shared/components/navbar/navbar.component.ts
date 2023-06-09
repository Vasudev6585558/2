import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  LogoutAction,
  OpenLoginFormAction,
} from 'src/app/modules/auth/state/auth.actions';
import { AuthStateModel } from 'src/app/modules/auth/state/auth.model';
import { AuthState } from 'src/app/modules/auth/state/auth.state';
import { LoginModalComponent } from 'src/app/modules/auth/components/login/login-modal.component';
import { CurrentMember } from '../../common/models';
import { uiroutes } from '../../common/ui-routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  dashboardRoute: string = uiroutes.DASHBOARD_ROUTE.route;
  profileRoute: string;
  accountRoute: string = uiroutes.ACCOUNT_ROUTE.route;
  supportRoute: string = uiroutes.SUPPORT_ROUTE.route;
  ownIssuesRoute: string = uiroutes.OWN_ISSUES_ROUTE.route;
  @Select(AuthState)
  authState$: Observable<AuthStateModel>;
  authState: AuthStateModel;
  currentMember: CurrentMember;
  isLoggedIn: boolean;
  isFullyAuthenticated: Boolean;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.authState$.subscribe((val) => {
      this.authState = val;
      this.isLoggedIn = this.authState?.isLoggedIn;
      this.isFullyAuthenticated = this.authState?.isFullyAuthenticated;
      this.currentMember = this.authState?.currentMember;
      this.profileRoute = `${uiroutes.MEMBER_PROFILE_ROUTE.route}/${this.currentMember?.username}`;
    });
  }

  onAvatarClick() {
    this.router.navigateByUrl(this.profileRoute);
  }

  onChatClick() {
    this.router.navigateByUrl(uiroutes.CHAT_ROUTE.route);
  }

  login() {
    this.store.dispatch(new OpenLoginFormAction());
    const dialogRef = this.dialog.open(LoginModalComponent);
    dialogRef.afterClosed().subscribe((result) => {});
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }
  ngOnInit(): void {}
}
