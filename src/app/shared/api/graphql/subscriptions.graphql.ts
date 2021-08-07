import { gql } from 'apollo-angular';

export const SUBSCRIPTIONS = {
  institution: gql`
    subscription institution {
      notifyInstitution {
        institution {
          id
          name
          location
          city
          bio
        }
        method
      }
    }
  `,
  user: gql`
    subscription user {
      notifyUser {
        user {
          id
          firstName
          lastName
          title
          bio
          membershipStatus
          institution {
            id
            name
          }
        }
        method
      }
    }
  `,
  userRole: gql`
    subscription userrole {
      notifyUserRole {
        userRole {
          id
          name
          description
          permissions
        }
        method
      }
    }
  `,
  announcement: gql`
    subscription announcement {
      notifyAnnouncement {
        announcement {
          id
          title
          author {
            id
            firstName
            lastName
            avatar
          }
          message
          seenBy {
            id
            firstName
            lastName
          }
        }
        method
      }
    }
  `,
  group: gql`
    subscription group {
      notifyGroup {
        group {
          id
          name
          description
        }
        method
      }
    }
  `,
  course: gql`
    subscription course {
      notifyCourse {
        course {
          id
          title
          description
        }
        method
      }
    }
  `,
  courseSection: gql`
    subscription courseSection {
      notifyCourseSection {
        courseSection {
          id
          title
          index
          course {
            id
            title
          }
        }
        method
      }
    }
  `,
  chapter: gql`
    subscription chapter {
      notifyChapter {
        chapter {
          id
          title
          instructions
          course {
            id
            title
          }
          section {
            id
            title
          }
          dueDate
          points
        }
        method
      }
    }
  `,
  exercise: gql`
    subscription exercise {
      notifyExercise {
        exercise {
          id
          prompt
          questionType
          required
          options
          points
        }
        method
      }
    }
  `,
  exerciseFileAttachment: gql`
    subscription exerciseFileAttachment {
      notifyExerciseFileAttachment {
        exerciseFileAttachment {
          id
          name
          exercise {
            id
          }
          description
        }
        method
      }
    }
  `,
  exerciseSubmission: gql`
    subscription exerciseSubmission {
      notifyExerciseSubmission {
        exerciseSubmission {
          id
          participant {
            id
            firstName
            lastName
            institution {
              id
              name
            }
          }
          exercise {
            id
          }
          option
          answer
          points
          status
        }
        method
      }
    }
  `,
  exerciseKey: gql`
    subscription exerciseKey {
      notifyExerciseKey {
        exerciseKey {
          id
          exercise {
            id
            prompt
            chapter {
              id
            }
            options
            points
          }
          validOption
          validAnswers
          referenceLink
          referenceImages
        }
        method
      }
    }
  `,
  report: gql`
    subscription report {
      notifyReport {
        report {
          id
          participant {
            id
            firstName
            lastName
          }
          course {
            id
            title
          }
          institution {
            id
            name
          }
          completed
          score
        }
        method
      }
    }
  `,
  chat: gql`
    subscription chat {
      notifyChat {
        chat {
          id
          individualMemberOne {
            id
            firstName
            lastName
          }
          individualMemberTwo {
            id
            firstName
            lastName
          }
          group {
            name
            members {
              id
              firstName
              lastName
              avatar
            }
          }
        }
        method
      }
    }
  `,
  chatMessage: gql`
    subscription chatMessage {
      notifyChatMessage {
        chatMessage {
          id
          chat {
            id
          }
          message
          author {
            id
            firstName
            lastName
            avatar
          }
          seenBy {
            id
          }
          createdAt
        }
        method
      }
    }
  `,
};
