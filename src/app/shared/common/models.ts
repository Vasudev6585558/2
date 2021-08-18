import { defaultPageSize } from '../abstract/master-grid/table.model';
import { defaultSearchParams } from './constants';

/* 
This is an object that requires an id of type string
to be used in NGXS actions
*/
export type idPayload = {
  id: number;
};

/*
Fetch policy to be used when making Graphql queries via AWS Amplify Client
*/
export type FetchPolicy =
  | 'cache-first'
  | 'cache-and-network'
  | 'network-only'
  | 'cache-only'
  | 'no-cache'
  | 'standby';

export type HotToastPositionOptions =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type HotToastStatus =
  | 'show'
  | 'success'
  | 'warning'
  | 'error'
  | 'loading';

export type MatSelectOption = { label: string; value: number | string };

export type FetchParams = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  offset: number; // the number of records in all pages prior to current page combined
  searchQuery: string;
  columnFilters: any;
};

export const startingFetchParams: FetchParams = {
  currentPage: 1,
  totalCount: 0,
  pageSize: defaultPageSize,
  offset: 0,
  searchQuery: defaultSearchParams.searchQuery,
  columnFilters: null,
};

export type CurrentMember = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  invitecode?: string;
  institution?: { id: number; name: string };
  membershipStatus: string;
  role: { name?: string; permissions: UserPermissions };
  createdAt?: string;
  updatedAt?: string;
};

export const SUBSCRIPTION_METHODS = {
  CREATE_METHOD: 'CREATE',
  UPDATE_METHOD: 'UPDATE',
  DELETE_METHOD: 'DELETE',
};

export type ChatType = 'IL' | 'GP';
export const ChatTypes = {
  INDIVIDUAL: 'IL',
  GROUP: 'GP',
};

export type MembershipStatus = 'UI' | 'PE' | 'AP' | 'SU';

export const MembershipStatusOptions = {
  UNINITIALIZED: 'UI',
  PENDING: 'PE',
  APPROVED: 'AP',
  SUSPENDED: 'SU',
};

export type GroupType = 'CL' | 'TE' | 'CO';

export const GroupTypeOptions = {
  class: 'CL',
  team: 'TE',
  coordination: 'CO',
};

export type ExerciseQuestionType = 'OP' | 'DE' | 'IM' | 'LI';
export const ExerciseQuestionTypeOptions = {
  options: 'OP',
  descriptive_answer: 'DE',
  image_upload: 'IM',
  link: 'LI',
};

export type CourseStatus = 'DR' | 'PU' | 'AR';
export const CourseStatusOptions = {
  draft: 'DR',
  published: 'PU',
  archived: 'AR',
};

export type ChapterStatus = 'DR' | 'PU';
export const ChapterStatusOptions = {
  draft: 'DR',
  published: 'PU',
};

export type ExerciseSubmissionStatus = 'PE' | 'SU' | 'GR' | 'RE';
export const ExerciseSubmissionStatusOptions = {
  pending: 'PE',
  submitted: 'SU',
  graded: 'GR',
  returned: 'RE',
};

export type User = {
  id?: number;
  username?: string;
  firstName: string;
  lastName: string;
  email?: string;
  avatar?: string;
  institution?: any;
  invitecode?: string;
  title?: string;
  bio?: string;
  role: { name?: string; permissions: UserPermissions };
  createdAt?: string;
  updatedAt?: string;
};

export const LIST = 'LIST';
export const GET = 'GET';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';

export type UserRole = {
  name: string;
  description: string;
  priority: number;
  permissions: object | string;
  createdAt?: string;
  updatedAt?: string;
};

export type Announcement = {
  id: number;
  title: string;
  author: any;
  message: string;
  institution: any;
  groups: any[];
  createdAt?: string;
  updatedAt?: string;
};

export type Group = {
  id: number;
  avatar: string;
  name: string;
  description: string;
  institution: any;
  members: any[];
  admins: any[];
  groupType: GroupType;
  createdAt?: string;
  updatedAt?: string;
};

export type Institution = {
  id: number;
  name: string;
  location?: string;
  city?: string;
  website?: string;
  phone?: string;
  logo?: string;
  bio?: string;
  invitecode?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Course = {
  id: number;
  title: string;
  blurb: string;
  description: string;
  instructor: any;
  institutions?: any[];
  participants?: any[];
  mandatoryPrerequisites?: any[];
  recommendedPrerequisites?: any[];
  startDate?: string;
  endDate?: string;
  creditHours?: number;
  status: CourseStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type CourseSection = {
  id: number;
  title: string;
  index: number;
  course: any;
  createdAt?: string;
  updatedAt?: string;
};

export type Chapter = {
  id: number;
  title: string;
  instructions: string;
  course: any;
  section?: any;
  prerequisites?: any[];
  dueDate?: string;
  points?: number;
  status: ChapterStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type Exercise = {
  id: number;
  prompt: string;
  chapter: any;
  course: any;
  questionType: ExerciseQuestionType;
  required: boolean;
  options?: string[];
  points?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ExerciseKey = {
  id: number;
  exercise: any;
  chapter: any;
  course: any;
  validOption: string;
  validAnswers: string[];
  referenceLink: string;
  referenceImages: string[];
};

export type ExerciseSubmission = {
  id: number;
  exercise: any;
  chapter: any;
  course: any;
  participant: any;
  option?: string;
  answer?: string;
  link?: string;
  images?: string[];
  points?: number;
  status?: ExerciseSubmissionStatus | string;
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Report = {
  id: number;
  participant: any;
  course: any;
  institution: any;
  completed: number;
  score: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Chat = {
  id: number;
  chatType: ChatType;
  group: Group | number;
  individualMemberOne: User | number;
  individualMemberTwo: User | number;
  chatmessageSet: ChatMessage[] | number[];
  createdAt?: string;
  updatedAt?: string;
};

export type ChatMessage = {
  id: number;
  message: string;
  author: User | number;
  createdAt?: string;
  updatedAt?: string;
};

export type ChatSearchResult = {
  title: string;
  subtitle: string;
  avatar: string;
  chatId: number;
  userId: number;
};

export const RESOURCE_ACTIONS = {
  LIST: 'LIST',
  GET: 'GET',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

type ResourceActions = {
  LIST: boolean;
  GET: boolean;
  CREATE: boolean;
  UPDATE: boolean;
  DELETE: boolean;
};

const defaultActions: ResourceActions = {
  LIST: true,
  GET: true,
  CREATE: true,
  UPDATE: true,
  DELETE: true,
};

export const resources = {
  MODERATION: 'MODERATION',
  USER_ROLE: 'USER_ROLE',
  MEMBER: 'MEMBER',
  INSTITUTION_ADMIN: 'INSTITUTION_ADMIN',
  CLASS_ADMIN: 'CLASS_ADMIN',
  LEARNER: 'LEARNER',
  INSTITUTION: 'INSTITUTION',
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  CHAPTER: 'CHAPTER',
  COURSE: 'COURSE',
  GROUP: 'GROUP',
  GRADING: 'GRADING',
  EXERCISE_KEY: 'EXERCISE_KEY',
  EXERCISE_SUBMISSION: 'EXERCISE_SUBMISSION',
  REPORT: 'REPORT',
  OWN_PROFILE: 'OWN_PROFILE',
};

export type UserPermissions = {
  MODERATION: ResourceActions;
  LEARNER: ResourceActions;
  CLASS_ADMIN: ResourceActions;
  MEMBER: ResourceActions;
  INSTITUTION_ADMIN: ResourceActions;
  INSTITUTION: ResourceActions;
  ANNOUNCEMENT: ResourceActions;
  ASSIGNMENT: ResourceActions;
  CHAPTER: ResourceActions;
  COURSE: ResourceActions;
  GROUP: ResourceActions;
  GRADING: ResourceActions;
  EXERCISE_KEY: ResourceActions;
  EXERCISE_SUBMISSION: ResourceActions;
  REPORT: ResourceActions;
  USER_ROLE: ResourceActions;
  OWN_PROFILE: ResourceActions;
};

export const defaultResourcePermissions: UserPermissions = {
  MODERATION: defaultActions,
  LEARNER: defaultActions,
  CLASS_ADMIN: defaultActions,
  MEMBER: defaultActions,
  INSTITUTION_ADMIN: defaultActions,
  INSTITUTION: defaultActions,
  ANNOUNCEMENT: defaultActions,
  ASSIGNMENT: defaultActions,
  CHAPTER: defaultActions,
  COURSE: defaultActions,
  GROUP: defaultActions,
  GRADING: defaultActions,
  EXERCISE_KEY: defaultActions,
  EXERCISE_SUBMISSION: defaultActions,
  REPORT: defaultActions,
  USER_ROLE: defaultActions,
  OWN_PROFILE: defaultActions,
};
