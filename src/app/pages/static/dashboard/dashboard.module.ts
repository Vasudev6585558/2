import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { Styling } from 'src/app/styling.imports';
import { ReportDashboardComponent } from './tabs/report-dashboard/report-dashboard.component';
import { CourseDashboardComponent } from './tabs/course-dashboard/course-dashboard.component';
import { AdminDashboardComponent } from './tabs/admin-dashboard/admin-dashboard.component';
import { AnnouncementDashboardComponent } from './tabs/announcement-dashboard/announcement-dashboard.component';
import { AssignmentDashboardComponent } from './tabs/assignment-dashboard/assignment-dashboard.component';
import { GroupDashboardComponent } from './tabs/group-dashboard/group-dashboard.component';
import {
  ExercicseKeyDialog,
  GradingDashboardComponent,
} from './tabs/grading-dashboard/grading-dashboard.component';
import { ChapterPublishedComponent } from '../../profiles/chapter-profile/published/chapter-published.component';
import { ChapterDraftComponent } from '../../profiles/chapter-profile/draft/chapter-draft.component';
import {
  ChapterDeleteConfirmationDialog,
  ChapterProfileComponent,
  ExercicseDeleteConfirmationDialog,
} from '../../profiles/chapter-profile/chapter-profile.component';
import {
  CourseDeleteConfirmationDialog,
  CourseProfileComponent,
} from '../../profiles/course-profile/course-profile.component';
import {
  UserApprovalConfirmationDialog,
  UserDenialConfirmationDialog,
  UserModerationProfileComponent,
} from '../../modals/moderate-user/user-moderation.component';
import { UserModerationRendererComponent } from 'src/app/shared/cell-renderers/user-moderation/user-moderation-renderer.component';
import { ChatComponent } from '../chat/chat.component';
import { AddEditUserRoleComponent } from '../../forms/add-edit-user-role/add-edit-user-role.component';
import {
  RoleDeleteConfirmationDialog,
  RoleProfileComponent,
} from '../../modals/role-profile/role-profile.component';
import { RolesTableComponent } from '../../tables/roles-table/roles-table.component';
import {
  InstitutionDeleteConfirmationDialogModal,
  InstitutionModalComponent,
} from '../../modals/institution-modal/institution-modal.component';
import { PaginatorComponent } from 'src/app/shared/abstract/master-grid/components/paginator/paginator.component';
import { LoginModalComponent } from '../../modals/login/login-modal.component';
import {
  AddEditGroupComponent,
  GroupMemberReviewDialog,
} from '../../forms/add-edit-group/add-edit-group.component';
import { OwnProfileComponent } from '../../profiles/own-user-profile/own-profile.component';
import { AddEditChapterComponent } from '../../forms/add-edit-chapter/add-edit-chapter.component';
import { AddEditCourseComponent } from '../../forms/add-edit-course/add-edit-course.component';
import {
  MemberDeleteConfirmationDialog,
  MemberProfileComponent,
} from '../../modals/member-profile/member-profile.component';
import {
  GroupDeleteConfirmationDialog,
  GroupProfileComponent,
} from '../../profiles/group-profile/group-profile.component';
import {
  AnnouncementDeleteConfirmationDialog,
  AnnouncementProfileComponent,
} from '../../profiles/announcement-profile/announcement-profile.component';
import { AddEditAnnouncementComponent } from '../../forms/add-edit-announcement/add-edit-announcement.component';
import {
  InstitutionDeleteConfirmationDialog,
  InstitutionProfileComponent,
} from '../../profiles/institution-profile/institution-profile.component';
import { MemberProfileRendererComponent } from 'src/app/shared/cell-renderers/member-profile/member-profile-renderer.component';
import { LearnersTableComponent } from '../../tables/learners-table/learners-table.component';
import { ClassAdminsTableComponent } from '../../tables/class-admin-table/class-admins-table.component';
import { InstitutionAdminsTableComponent } from '../../tables/institution-admins-table/institution-admins-table.component';
import { MembersTableComponent } from '../../tables/members-table/members-table.component';
import { AwaitingModerationTableComponent } from '../../tables/awaiting-moderation-table/awaiting-moderation-table.component';
import { InstitutionsTableComponent } from '../../tables/institutions-table/institutions-table.component';
import { MasterGridComponent } from 'src/app/shared/abstract/master-grid/components/master-grid/master-grid.component';
import { InstitutionProfileRendererComponent } from 'src/app/shared/cell-renderers/institution-profile/institution-profile-renderer.component';
import { AddEditInstitutionComponent } from '../../forms/add-edit-institution/add-edit-institution.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { SimpleLoadingSpinnerComponent } from 'src/app/shared/components/loading/simple-spinner/simple-loading-spinner.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  CourseSectionModalComponent,
  CouseSectionDeleteConfirmationDialog,
} from '../../modals/course-section-modal/course-section-modal.component';
import { NgxsModule } from '@ngxs/store';
import { HotToastModule } from '@ngneat/hot-toast';
import { AuthState } from 'src/app/shared/state/auth/auth.state';
import { NotificationState } from 'src/app/shared/state/notifications/notification.state';
import { LoadingState } from 'src/app/shared/state/loading/loading.state';
import { InstitutionState } from 'src/app/shared/state/institutions/institution.state';
import { MemberState } from 'src/app/shared/state/members/member.state';
import { GroupState } from 'src/app/shared/state/groups/group.state';
import { AnnouncementState } from 'src/app/shared/state/announcements/announcement.state';
import { CourseState } from 'src/app/shared/state/courses/course.state';
import { AssignmentState } from 'src/app/shared/state/assignments/assignment.state';
import { CourseSectionState } from 'src/app/shared/state/courseSections/courseSection.state';
import { ChapterState } from 'src/app/shared/state/chapters/chapter.state';
import { ExerciseState } from 'src/app/shared/state/exercises/exercise.state';
import { ExerciseSubmissionState } from 'src/app/shared/state/exerciseSubmissions/exerciseSubmission.state';
import { ExerciseKeyState } from 'src/app/shared/state/exerciseKeys/exerciseKey.state';
import { ReportState } from 'src/app/shared/state/reports/report.state';
import { OptionsState } from 'src/app/shared/state/options/options.state';
import { UserRoleState } from 'src/app/shared/state/userRoles/userRole.state';
import { ChatState } from 'src/app/shared/state/chats/chat.state';
import { SubscriptionsState } from 'src/app/shared/state/subscriptions/subscriptions.state';
import { environment } from 'src/environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  const linkRenderer = renderer.link;
  renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}

@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    AnnouncementDashboardComponent,
    AssignmentDashboardComponent,
    CourseDashboardComponent,
    GroupDashboardComponent,
    GradingDashboardComponent,
    ReportDashboardComponent,
    AddEditInstitutionComponent,
    InstitutionProfileRendererComponent,
    MasterGridComponent,
    InstitutionsTableComponent,
    AwaitingModerationTableComponent,
    MembersTableComponent,
    InstitutionAdminsTableComponent,
    ClassAdminsTableComponent,
    LearnersTableComponent,
    MemberProfileRendererComponent,
    MemberProfileComponent,
    AddEditGroupComponent,
    InstitutionProfileComponent,
    InstitutionDeleteConfirmationDialog,
    GroupProfileComponent,
    AddEditAnnouncementComponent,
    AnnouncementProfileComponent,
    AnnouncementDeleteConfirmationDialog,
    GroupDeleteConfirmationDialog,
    MemberDeleteConfirmationDialog,
    MemberProfileComponent,
    AddEditCourseComponent,
    AddEditChapterComponent,
    OwnProfileComponent,
    GroupMemberReviewDialog,
    LoginModalComponent,
    PaginatorComponent,
    InstitutionModalComponent,
    InstitutionDeleteConfirmationDialogModal,
    RolesTableComponent,
    RoleProfileComponent,
    RoleDeleteConfirmationDialog,
    AddEditUserRoleComponent,
    ChatComponent,
    UserModerationProfileComponent,
    UserModerationRendererComponent,
    UserApprovalConfirmationDialog,
    UserDenialConfirmationDialog,
    GradingDashboardComponent,
    CourseProfileComponent,
    CourseDeleteConfirmationDialog,
    ChapterProfileComponent,
    ChapterDeleteConfirmationDialog,
    ExercicseDeleteConfirmationDialog,
    ChapterDraftComponent,
    ChapterPublishedComponent,
    ExercicseKeyDialog,
    CourseSectionModalComponent,
    CouseSectionDeleteConfirmationDialog,
    SimpleLoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    InfiniteScrollModule,
    LMarkdownEditorModule,
    HotToastModule.forRoot(),
    [
      NgxsModule.forRoot(
        [
          AuthState,
          NotificationState,
          LoadingState,
          InstitutionState,
          MemberState,
          GroupState,
          AnnouncementState,
          AssignmentState,
          CourseState,
          CourseSectionState,
          ChapterState,
          ExerciseState,
          ExerciseSubmissionState,
          ExerciseKeyState,
          ReportState,
          OptionsState,
          UserRoleState,
          ChatState,
          SubscriptionsState,
        ],
        {
          developmentMode: !environment.production,
        }
      ),
      NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
    DashboardRoutingModule,
    Styling,
  ],
})
export class DashboardModule {}