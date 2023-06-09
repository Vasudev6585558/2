import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SearchParams } from 'src/app/shared/modules/master-grid/table.model';
import { idPayload } from 'src/app/shared/common/models';

export class FetchExerciseKeysAction {
  static readonly type = '[EXERCISE_KEYS] Fetch';

  constructor(public payload: { searchParams: SearchParams }) {}
}

export class FetchNextExerciseKeysAction {
  static readonly type = '[EXERCISE_KEYS] Fetch Next';

  constructor() {}
}

export class ExerciseKeySubscriptionAction {
  static readonly type = '[EXERCISE_KEYS] Subscribe';

  constructor() {}
}

export class ForceRefetchExerciseKeysAction {
  static readonly type = '[EXERCISE_KEYS] Fetch from network';

  constructor() {}
}

export class GetExerciseKeyAction {
  static readonly type = '[EXERCISE_KEY] Get';

  constructor(public payload: { exerciseId: number }) {}
}

export class CreateUpdateExerciseKeyAction {
  static readonly type = '[EXERCISE_KEY] Create';

  constructor(
    public payload: {
      form: FormGroup;
      formDirective: FormGroupDirective;
    }
  ) {}
}

export class ResetExerciseKeyFormAction {
  static readonly type = '[EXERCISE_KEY] Reset Form';

  constructor() {}
}

export class ResetExerciseKeyStateAction {
  static readonly type = '[EXERCISE_KEY] Reset State';

  constructor() {}
}

export class DeleteExerciseKeyAction {
  static readonly type = '[EXERCISE_KEY] Delete';

  constructor(public payload: idPayload) {}
}
