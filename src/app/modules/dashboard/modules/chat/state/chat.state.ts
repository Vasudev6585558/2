import {
  Action,
  Select,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import {
  defaultChatState,
  emptyChatFormRecord,
  ChatFormCloseURL,
  ChatStateModel,
  ChatUIObject,
} from './chat.model';

import { ComponentFactoryResolver, Injectable } from '@angular/core';
import {
  ChatMessageSubscriptionAction,
  ClearChatMembers,
  CreateChatMessageAction,
  CreateUpdateChatAction,
  DeleteChatAction,
  FetchChatMessagesAction,
  FetchChatsAction,
  FetchNextChatMessagesAction,
  FetchNextChatsAction,
  ForceRefetchChatsAction,
  GetChatAction,
  GetIntoChatAction,
  ResetChatFormAction,
  SearchChatMembersAction,
  SelectChatAction,
} from './chat.actions';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthState } from 'src/app/modules/auth/state/auth.state';
import {
  ChatSearchResult,
  FetchParams,
  MatSelectOption,
  startingFetchParams,
  User,
} from 'src/app/shared/common/models';
import { SearchParams } from 'src/app/shared/modules/master-grid/table.model';
import { CHAT_QUERIES } from 'src/app/shared/api/graphql/queries.graphql';
import {
  getErrorMessageFromGraphQLResponse,
  parseDateTime,
  subscriptionUpdater,
  updateFetchParams,
} from 'src/app/shared/common/functions';
import {
  defaultLogos,
  defaultSearchParams,
} from 'src/app/shared/common/constants';
import { ShowNotificationAction } from 'src/app/shared/state/notifications/notification.actions';
import {
  CHAT_MESSAGE_MUTATIONS,
  CHAT_MUTATIONS,
} from 'src/app/shared/api/graphql/mutations.graphql';

@State<ChatStateModel>({
  name: 'chatState',
  defaults: defaultChatState,
})
@Injectable()
export class ChatState {
  @Select(AuthState.getCurrentMember)
  currentMember$: Observable<User>;
  currentMember: User;

  constructor(
    private apollo: Apollo,
    private store: Store,
    private router: Router
  ) {
    this.currentMember$.subscribe((val) => {
      this.currentMember = val;
    });
  }

  @Selector()
  static listChats(state: ChatStateModel): ChatUIObject[] {
    return state.chats;
  }

  @Selector()
  static getIsFetchingChats(state: ChatStateModel): boolean {
    return state.isFetching;
  }

  @Selector()
  static getChatSearchResults(state: ChatStateModel): ChatSearchResult[] {
    return state.chatSearchResults;
  }

  @Selector()
  static getIsFetchingChatMembers(state: ChatStateModel): boolean {
    return state.isFetchingChatMembers;
  }

  @Selector()
  static getIsFetchingChatMessages(state: ChatStateModel): boolean {
    return state.isFetchingChatMessages;
  }

  @Selector()
  static isFetching(state: ChatStateModel): boolean {
    return state.isFetching;
  }

  @Selector()
  static isCreatingNewChatMessage(state: ChatStateModel): boolean {
    return state.isCreatingNewChatMessage;
  }

  isCreatingNewChatMessage;

  @Selector()
  static fetchParams(state: ChatStateModel): FetchParams {
    return state.fetchParamObjects[state.fetchParamObjects.length - 1];
  }
  @Selector()
  static listChatOptions(state: ChatStateModel): MatSelectOption[] {
    const options: MatSelectOption[] = state.chats.map((i) => {
      const option: MatSelectOption = {
        value: i.id,
        label: `${i.name}`,
      };
      return option;
    });

    return options;
  }

  @Selector()
  static errorFetching(state: ChatStateModel): boolean {
    return state.errorFetching;
  }

  @Selector()
  static formSubmitting(state: ChatStateModel): boolean {
    return state.formSubmitting;
  }

  @Selector()
  static errorSubmitting(state: ChatStateModel): boolean {
    return state.errorSubmitting;
  }

  @Selector()
  static getChatFormRecord(state: ChatStateModel): ChatUIObject {
    return state.chatFormRecord;
  }

  @Action(ForceRefetchChatsAction)
  forceRefetchChats({ getState, patchState }: StateContext<ChatStateModel>) {
    const state = getState();
    let previousFetchParams =
      state.fetchParamObjects[state.fetchParamObjects.length - 1];
    previousFetchParams = previousFetchParams
      ? previousFetchParams
      : startingFetchParams;
    const pageNumber = previousFetchParams?.currentPage;
    const previousSearchParams: SearchParams = {
      pageNumber,
      pageSize: previousFetchParams?.pageSize,
      searchQuery: previousFetchParams?.searchQuery,
      columnFilters: previousFetchParams?.columnFilters,
    };
    patchState({ fetchPolicy: 'network-only' });
    this.store.dispatch(
      new FetchChatsAction({ searchParams: previousSearchParams })
    );
  }

  @Action(SearchChatMembersAction)
  searchChatMembers(
    { getState, patchState }: StateContext<ChatStateModel>,
    { payload }: SearchChatMembersAction
  ) {
    const { query } = payload;
    const state = getState();
    const { fetchPolicy } = state;
    patchState({ isFetchingChatMembers: true });
    this.apollo
      .mutate({
        mutation: CHAT_QUERIES.CHAT_SEARCH,
        variables: { query },
      })
      .subscribe(
        ({ data }: any) => {
          const response = data.chatSearch ? data.chatSearch : [];
          let results: ChatSearchResult[] = [];

          results = results.concat(
            response.users.map((u) => {
              return {
                title: u.name,
                subtitle: parseDateTime(u.lastActive),
                avatar: u.avatar,
                userId: u.id,
                chatId: null,
              };
            })
          );

          results = results.concat(
            response.groups.map((g) => {
              return {
                title: g.name,
                subtitle: 'Group Chat',
                avatar: g.avatar,
                userId: null,
                chatId: g.chat?.id,
              };
            })
          );

          results = results.concat(
            response.chatMessages.map((c) => {
              const index = c.message?.indexOf(query);
              let message = c.message;
              if (message.length > query.length + 25) {
                message =
                  c.message?.slice(index > 5 ? index - 5 : 0, index + 20) +
                  '...';
              }
              return {
                title: message,
                subtitle: parseDateTime(c.createdAt),
                avatar: defaultLogos.chat,
                userId: null,
                chatId: c.chat.id,
              };
            })
          );

          patchState({
            chatSearchResults: results,
            isFetchingChatMembers: false,
          });
        },
        (error) => {
          this.store.dispatch(
            new ShowNotificationAction({
              message: getErrorMessageFromGraphQLResponse(error),
              action: 'error',
            })
          );
          patchState({ isFetchingChatMembers: false });
        }
      );
  }

  @Action(FetchNextChatsAction)
  fetchNextChats({ getState }: StateContext<ChatStateModel>) {
    const state = getState();
    const lastPageNumber = state.lastChatPage;
    const pageNumber =
      state.fetchParamObjects[state.fetchParamObjects.length - 1].currentPage +
      1;
    const newSearchParams: SearchParams = {
      ...defaultSearchParams,
      pageNumber,
    };
    if (
      !lastPageNumber ||
      (lastPageNumber != null && pageNumber <= lastPageNumber)
    ) {
      this.store.dispatch(
        new FetchChatsAction({ searchParams: newSearchParams })
      );
    }
  }

  @Action(FetchChatsAction)
  fetchChats(
    { getState, patchState }: StateContext<ChatStateModel>,
    { payload }: FetchChatsAction
  ) {
    const state = getState();
    const { fetchParamObjects, fetchPolicy } = state;
    const { searchParams } = payload;
    const { searchQuery, pageSize, pageNumber, columnFilters } = searchParams;
    let newFetchParams = updateFetchParams({
      fetchParamObjects,
      newPageNumber: pageNumber,
      newPageSize: pageSize,
      newSearchQuery: searchQuery,
      newColumnFilters: columnFilters,
    });
    patchState({ isFetching: true });
    const variables = {
      searchField: searchQuery,
      limit: newFetchParams.pageSize,
      offset: newFetchParams.offset,
    };
    this.apollo
      .query({
        query: CHAT_QUERIES.GET_CHATS,
        variables,
        fetchPolicy,
      })
      .subscribe(
        ({ data }: any) => {
          const response = data.chats;

          newFetchParams = { ...newFetchParams };
          let chats = state.chats;
          let responseChats = response.chats;
          let responseGroups = response.groups;

          // Parsing the individual chats in to chat objects
          responseChats = responseChats.map((chat) => {
            let member;

            if (chat.individualMemberOne?.id == this.currentMember?.id) {
              member = chat.individualMemberTwo;
            } else if (chat.individualMemberTwo?.id == this.currentMember?.id) {
              member = chat.individualMemberOne;
            }

            const preppedChat = {
              id: chat.id,
              name: member.name,
              subtitle: parseDateTime(member.lastActive),
              avatar: member.avatar,
              chatmessageSet: [],
            };
            return preppedChat;
          });
          // Parsing the groups into chat objects

          responseGroups = responseGroups.map((group) => {
            const preppedChat = {
              id: group?.chat?.id,
              name: group?.name,
              subtitle: `${group?.members?.length} members`,
              avatar: group?.avatar ? group?.avatar : defaultLogos.user,
              chatmessageSet: [],
            };
            return preppedChat;
          });

          chats = chats.concat(responseChats).concat(responseGroups);

          let lastChatPage = null;
          if (response.length < newFetchParams.pageSize) {
            lastChatPage = newFetchParams.currentPage;
          }
          patchState({
            chats,
            lastChatPage,
            fetchParamObjects: state.fetchParamObjects.concat([newFetchParams]),
            isFetching: false,
          });
        },
        (error) => {
          this.store.dispatch(
            new ShowNotificationAction({
              message: getErrorMessageFromGraphQLResponse(error),
              action: 'error',
            })
          );
          patchState({ isFetching: false });
        }
      );
  }

  @Action(SelectChatAction)
  selectChat(
    { getState, patchState }: StateContext<ChatStateModel>,
    { payload }: GetChatAction
  ) {
    const { id } = payload;

    if (id) {
      const state = getState();
      if (id !== state.chatFormRecord.id) {
        // Skipping thse if we're selecting a chat that is already selected
        const chat = state.chats.find((c) => c.id == id);
        if (chat) {
          patchState({
            chatFormRecord: chat,
            chatMessagesFetchParamss: [],
          });
          this.store.dispatch(
            new FetchChatMessagesAction({
              searchParams: defaultSearchParams,
            })
          );
        } else {
          this.store.dispatch(new GetChatAction({ id }));
        }
      }
    } else {
      patchState({
        chatFormRecord: emptyChatFormRecord,
        lastChatMessagesPage: null,
      });
    }
  }

  @Action(GetChatAction)
  getChat(
    { getState, patchState }: StateContext<ChatStateModel>,
    { payload }: GetChatAction
  ) {
    const { id } = payload;
    patchState({ isFetching: true });
    this.apollo
      .query({
        query: CHAT_QUERIES.GET_CHAT,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      .subscribe(
        ({ data }: any) => {
          const response = data.chat;

          const state = getState();
          const chats = [response, ...state.chats];
          patchState({
            chatFormRecord: response,
            lastChatMessagesPage: null,
            chats,
            isFetching: false,
          });
        },
        (error) => {
          this.store.dispatch(
            new ShowNotificationAction({
              message: getErrorMessageFromGraphQLResponse(error),
              action: 'error',
            })
          );
          patchState({ isFetching: false });
        }
      );
  }

  @Action(GetIntoChatAction)
  getIntoChat(
    { getState, patchState }: StateContext<ChatStateModel>,
    { payload }: GetIntoChatAction
  ) {
    const { id } = payload;
    patchState({ isFetching: true });
    this.apollo
      .mutate({
        mutation: CHAT_MUTATIONS.CHAT_WITH_MEMBER,
        variables: { id },
      })
      .subscribe(
        ({ data }: any) => {
          const response = data.chatWithMember;
          if (response.ok) {
            const chat = { ...response.chat, chatmessageSet: [] };
            const state = getState();
            patchState({
              chatFormRecord: chat,
              lastChatMessagesPage: null,
              chats: [chat].concat(state.chats),
              chatMessagesFetchParamss: [],
              isFetching: false,
            });
            this.store.dispatch(
              new FetchChatMessagesAction({
                searchParams: defaultSearchParams,
              })
            );
          }
        },
        (error) => {
          this.store.dispatch(
            new ShowNotificationAction({
              message: getErrorMessageFromGraphQLResponse(error),
              action: 'error',
            })
          );
        }
      );
  }

  // @Action(CreateUpdateChatAction)
  // createUpdateChat(
  //   { getState, patchState }: StateContext<ChatStateModel>,
  //   { payload }: CreateUpdateChatAction
  // ) {
  //   const state = getState();
  //   const { form, formDirective } = payload;
  //   let { formSubmitting } = state;
  //   if (form.valid) {
  //     formSubmitting = true;
  //     patchState({ formSubmitting });
  //     const values = form.value;
  //
  //     const updateForm = values.id == null ? false : true;
  //     const { id, ...sanitizedValues } = values;
  //     const variables = updateForm
  //       ? {
  //           input: sanitizedValues,
  //           id: values.id, // adding id to the mutation variables if it is an update mutation
  //         }
  //       : { input: sanitizedValues };

  //     this.apollo
  //       .mutate({
  //         mutation: updateForm
  //           ? CHAT_MUTATIONS.UPDATE_CHAT
  //           : CHAT_MUTATIONS.CREATE_CHAT,
  //         variables,
  //       })
  //       .subscribe(
  //         ({ data }: any) => {
  //           const response = updateForm ? data.updateChat : data.createChat;
  //           patchState({ formSubmitting: false });
  //
  //           if (response.ok) {
  //             this.store.dispatch(
  //               new ShowNotificationAction({
  //                 message: `Chat ${
  //                   updateForm ? 'updated' : 'created'
  //                 } successfully!`,
  //                 action: 'success',
  //               })
  //             );
  //             form.reset();
  //             formDirective.resetForm();
  //             this.router.navigateByUrl(ChatFormCloseURL);
  //             patchState({
  //               chatFormRecord: emptyChatFormRecord,
  //               fetchPolicy: 'network-only',
  //             });
  //           } else {
  //             this.store.dispatch(
  //               new ShowNotificationAction({
  //                 message: getErrorMessageFromGraphQLResponse(response?.errors),
  //                 action: 'error',
  //               })
  //             );
  //           }
  //
  //         },
  //         (error) => {
  //
  //           this.store.dispatch(
  //             new ShowNotificationAction({
  //               message: getErrorMessageFromGraphQLResponse(error),
  //               action: 'error',
  //             })
  //           );
  //           patchState({ formSubmitting: false });
  //         }
  //       );
  //   } else {
  //     this.store.dispatch(
  //       new ShowNotificationAction({
  //         message:
  //           'Please make sure there are no errors in the form before attempting to submit!',
  //         action: 'error',
  //       })
  //     );
  //   }
  // }

  @Action(DeleteChatAction)
  deleteChat({}: StateContext<ChatStateModel>, { payload }: DeleteChatAction) {
    let { id } = payload;
    this.apollo
      .mutate({
        mutation: CHAT_MUTATIONS.DELETE_CHAT,
        variables: { id },
      })
      .subscribe(
        ({ data }: any) => {
          const response = data.deleteChat;

          if (response.ok) {
            this.store.dispatch(
              new ShowNotificationAction({
                message: 'Chat deleted successfully!',
                action: 'success',
              })
            );
            this.store.dispatch(new ForceRefetchChatsAction());
          } else {
            this.store.dispatch(
              new ShowNotificationAction({
                message: getErrorMessageFromGraphQLResponse(response?.errors),
                action: 'error',
              })
            );
          }
        },
        (error) => {
          this.store.dispatch(
            new ShowNotificationAction({
              message: getErrorMessageFromGraphQLResponse(error),
              action: 'error',
            })
          );
        }
      );
  }

  @Action(FetchNextChatMessagesAction)
  fetchNextChatMessages({ getState }: StateContext<ChatStateModel>) {
    const state = getState();
    const lastPageNumber = state.lastChatMessagesPage;
    const pageNumber =
      state.chatMessagesFetchParamss[state.chatMessagesFetchParamss.length - 1]
        .currentPage + 1;
    const newSearchParams: SearchParams = {
      ...defaultSearchParams,
      pageNumber,
    };
    if (
      !lastPageNumber ||
      (lastPageNumber != null && pageNumber <= lastPageNumber)
    ) {
      this.store.dispatch(
        new FetchChatMessagesAction({ searchParams: newSearchParams })
      );
    }
  }

  @Action(FetchChatMessagesAction)
  fetchChatMessages(
    { getState, patchState }: StateContext<ChatStateModel>,
    { payload }: FetchChatMessagesAction
  ) {
    const state = getState();
    const { chatMessagesFetchParamss, fetchPolicy } = state;
    const chatId = state.chatFormRecord.id;
    const { searchParams } = payload;
    const { searchQuery, pageSize, pageNumber, columnFilters } = searchParams;
    let newFetchParams = updateFetchParams({
      fetchParamObjects: chatMessagesFetchParamss,
      newPageNumber: pageNumber,
      newPageSize: pageSize,
      newSearchQuery: searchQuery,
      newColumnFilters: columnFilters,
    });

    patchState({ isFetchingChatMessages: true });
    const variables = {
      chatId,
      searchField: searchQuery,
      limit: newFetchParams.pageSize,
      offset: newFetchParams.offset,
    };
    this.apollo
      .query({
        query: CHAT_QUERIES.GET_CHAT_MESSAGES,
        variables,
        fetchPolicy,
      })
      .subscribe(
        ({ data }: any) => {
          const response = data.chatMessages;
          newFetchParams = { ...newFetchParams };
          let chat: ChatUIObject = state.chats.find((c) => c.id == chatId);
          if (chat) {
            const chatmessageSet = chat.chatmessageSet.concat(response);
            chat = { ...chat, chatmessageSet };
            let chats = state.chats.filter((c) => c.id != chat.id);
            chats = [chat, ...chats];
            let formRecord =
              state.chatFormRecord.id == chat.id ? chat : state.chatFormRecord;

            //  Checking if the number of chat messages received is less than the limit
            // if it is less, then we declare that as the last page
            let lastChatMessagesPage = null;
            if (response.length < newFetchParams.pageSize) {
              lastChatMessagesPage = newFetchParams.currentPage;
            }
            patchState({
              chats,
              lastChatMessagesPage,
              chatFormRecord: formRecord,
              chatMessagesFetchParamss: state.fetchParamObjects.concat([
                newFetchParams,
              ]),
              isFetchingChatMessages: false,
            });
          }
        },
        (error) => {
          this.store.dispatch(
            new ShowNotificationAction({
              message: getErrorMessageFromGraphQLResponse(error),
              action: 'error',
            })
          );
          patchState({ isFetchingChatMessages: false });
        }
      );
  }

  @Action(ChatMessageSubscriptionAction)
  subscribeToChatMessage({
    getState,
    patchState,
  }: StateContext<ChatStateModel>) {
    const state = getState();
    if (!state.chatMessagesSubscribed) {
      this.apollo
        .subscribe({
          query: SUBSCRIPTIONS.chatMessage,
        })
        .subscribe((result: any) => {
          const state = getState();
          const method = result?.data?.notifyChatMessage?.method;
          const chatMessage = result?.data?.notifyChatMessage?.chatMessage;
          if (chatMessage) {
            let chat: ChatUIObject = state.chats.find(
              (c) => c.id == chatMessage?.chat?.id
            );
            if (chat) {
              const chatMessages = chat.chatmessageSet
                ? chat.chatmessageSet
                : [];

              const { items, fetchParamObjects } = subscriptionUpdater({
                items: chatMessages,
                method,
                subscriptionItem: chatMessage,
                fetchParamObjects: state.fetchParamObjects,
              });
              chat = { ...chat, chatmessageSet: items };
              let chats = state.chats.filter((c) => c.id != chat.id);
              chats = [chat, ...chats];
              patchState({
                chats: chats,
                chatFormRecord: chat,
                fetchParamObjects,
                chatMessagesSubscribed: true,
              });
            } else {
              this.store.dispatch(
                new GetChatAction({ id: chatMessage?.chat?.id })
              );
            }
          }
        });
    }
  }

  @Action(CreateChatMessageAction)
  createChatMessage(
    { getState, patchState }: StateContext<ChatStateModel>,
    { payload }: CreateChatMessageAction
  ) {
    const { id, message } = payload;
    const state = getState();

    patchState({ isCreatingNewChatMessage: true });
    this.apollo
      .mutate({
        mutation: CHAT_MESSAGE_MUTATIONS.CREATE_CHAT_MESSAGE,
        variables: {
          chat: id,
          message,
          author: this.currentMember.id,
        },
      })
      .subscribe(({ data }: any) => {
        patchState({ isCreatingNewChatMessage: false });

        const response = data.createChatMessage;
        // if (response.ok) {
        //   const chat = response.chatMessage?.chat;
        //
        //   patchState({ chatFormRecord: chat });
        // }
      });
  }

  @Action(ClearChatMembers)
  clearChatMembers({ patchState }: StateContext<ChatStateModel>) {
    patchState({
      chatSearchResults: [],
    });
  }

  @Action(ResetChatFormAction)
  resetChatForm({ patchState }: StateContext<ChatStateModel>) {
    patchState({
      chatFormRecord: emptyChatFormRecord,
      formSubmitting: false,
    });
  }
}
