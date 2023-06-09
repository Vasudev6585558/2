import {
  defaultResourcePermissions,
  FetchParams,
  FetchPolicyModel,
  resources,
  UserRole,
} from 'src/app/shared/common/models';
import { uiroutes } from 'src/app/shared/common/ui-routes';

export const defaultChatPermissions = {
  otherInstitutionAdmins: false,
  otherInstitutionMembers: false,
  ownInstitutionAdmins: false,
  ownInstitutioonMembers: false,
  ownClassMembers: false,
  ownTeamMembers: false,
  otherClassMembers: false,
  otherTeamMembers: false,
};

export const emptyUserRoleFormRecord: UserRole = {
  name: null,
  priority: null,
  description: null,
  permissions: defaultResourcePermissions,
  createdAt: null,
};

export interface UserRoleStateModel {
  roles: UserRole[];
  userRolesSubscribed: boolean;
  fetchPolicy: FetchPolicyModel;
  fetchParamObjects: FetchParams[];
  userRoleFormId: string;
  userRoleFormRecord: UserRole;
  isFetchingFormRecord: boolean;
  isFetching: boolean;
  errorFetching: boolean;
  formSubmitting: boolean;
  errorSubmitting: boolean;
}

export const defaultRoleState: UserRoleStateModel = {
  roles: [],
  userRolesSubscribed: false,
  fetchPolicy: null,
  fetchParamObjects: [],
  userRoleFormId: null,
  userRoleFormRecord: emptyUserRoleFormRecord,
  isFetchingFormRecord: false,
  isFetching: false,
  errorFetching: false,
  formSubmitting: false,
  errorSubmitting: false,
};
