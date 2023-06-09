import {
  Exercise,
  ExerciseKey,
  ExerciseSubmission,
  FetchParams,
  FetchPolicyModel,
} from 'src/app/shared/common/models';

export const emptyExerciseFormRecord: Exercise = {
  id: null,
  prompt: null,
  index: null,
  chapter: null,
  course: null,
  questionType: null,
  required: true,
  options: null,
  points: null,
};

export const emptyExerciseKeyFormRecord: ExerciseKey = {
  id: null,
  exercise: emptyExerciseFormRecord,
  chapter: null,
  course: null,
  validOption: null,
  validAnswers: [''],
  referenceLink: null,
  referenceImages: [],
  remarks: null,
};

export interface ExerciseStateModel {
  exercises: Exercise[];
  submissions: ExerciseSubmission[];
  paginatedExercises: any;
  lastPage: number;
  exercisesSubscribed: boolean;
  fetchPolicy: FetchPolicyModel;
  fetchParamObjects: FetchParams[];
  exerciseFormId: number;
  exerciseFormRecord: Exercise;
  isFetching: boolean;
  errorFetching: boolean;
  formSubmitting: boolean;
  errorSubmitting: boolean;
}

export const defaultExerciseState: ExerciseStateModel = {
  exercises: [],
  submissions: [],
  paginatedExercises: {},
  lastPage: null,
  exercisesSubscribed: false,
  fetchPolicy: null,
  fetchParamObjects: [],
  exerciseFormId: null,
  exerciseFormRecord: emptyExerciseFormRecord,
  isFetching: false,
  errorFetching: false,
  formSubmitting: false,
  errorSubmitting: false,
};
