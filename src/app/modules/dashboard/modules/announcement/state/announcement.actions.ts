import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SearchParams } from '../../../../../shared/modules/master-grid/table.model';
import { idPayload } from '../../../../../shared/common/models';

export class FetchAnnouncementsAction {
  static readonly type = '[ANNOUNCEMENTS] Fetch';

  constructor(public payload: { searchParams: SearchParams }) {}
}

export class FetchNextAnnouncementsAction {
  static readonly type = '[ANNOUNCEMENTS] Fetch Next';

  constructor() {}
}

export class AnnouncementSubscriptionAction {
  static readonly type = '[ANNOUNCEMENTS] Subscribe';

  constructor() {}
}

export class ForceRefetchAnnouncementsAction {
  static readonly type = '[ANNOUNCEMENTS] Fetch from network';

  constructor() {}
}

export class GetAnnouncementAction {
  static readonly type = '[ANNOUNCEMENT] Get';

  constructor(public payload: { id: number; fetchFormDetails: boolean }) {}
}

export class CreateUpdateAnnouncementAction {
  static readonly type = '[ANNOUNCEMENT] Create';

  constructor(
    public payload: {
      form: FormGroup;
      formDirective: FormGroupDirective;
    }
  ) {}
}

export class ResetAnnouncementFormAction {
  static readonly type = '[ANNOUNCEMENT] Reset Form';

  constructor() {}
}

export class DeleteAnnouncementAction {
  static readonly type = '[ANNOUNCEMENT] Delete';

  constructor(public payload: idPayload) {}
}

export class MarkAllAnnouncementsSeenAction {
  static readonly type = '[ANNOUNCEMENT] Mark all as read';

  constructor() {}
}
