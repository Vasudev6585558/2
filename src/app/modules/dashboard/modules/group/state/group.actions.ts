import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SearchParams } from 'src/app/shared/modules/master-grid/table.model';
import { idPayload } from 'src/app/shared/common/models';

export class FetchGroupsAction {
  static readonly type = '[GROUPS] Fetch';

  constructor(public payload: { searchParams: SearchParams }) {}
}

export class FetchNextGroupsAction {
  static readonly type = '[GROUPS] Fetch Next';

  constructor() {}
}

export class GroupSubscriptionAction {
  static readonly type = '[GROUPS] Subscribe';

  constructor() {}
}

export class ForceRefetchGroupsAction {
  static readonly type = '[GROUPS] Fetch from network';

  constructor() {}
}

export class GetGroupAction {
  static readonly type = '[GROUP] Get';

  constructor(public payload: idPayload) {}
}

export class CreateUpdateGroupAction {
  static readonly type = '[GROUP] Create';

  constructor(
    public payload: { form: FormGroup; formDirective: FormGroupDirective }
  ) {}
}

export class ResetGroupFormAction {
  static readonly type = '[GROUP] Reset Form';

  constructor() {}
}

export class DeleteGroupAction {
  static readonly type = '[GROUP] Delete';

  constructor(public payload: idPayload) {}
}
