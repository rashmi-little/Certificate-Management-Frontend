import { USER_DELETED } from "../../constants/Constants";
import {
    ADMINS_GET_FAILURE,
    ADMINS_GET_REQUEST,
    ADMINS_GET_SUCCESS,
    LOCKED_GET_FAILURE,
    LOCKED_GET_REQUEST,
    LOCKED_GET_SUCCESS,
    USER_CREATE_RESET,
    USER_CREATE_FAILURE,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_DELETE_CLEAN,
    USER_DELETE_FAILURE,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_GET_BY_ID_CLEAN,
    USER_GET_BY_ID_FAILURE,
    USER_GET_BY_ID_REQUEST,
    USER_GET_BY_ID_SUCCESS,
    USER_UPDATE_CLEAN,
    USER_UPDATE_FAILURE,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USERS_GET_RESET,
    USERS_GET_FAILURE,
    USERS_GET_REQUEST,
    USERS_GET_SUCCESS,
    USERS_LOCK_FAILURE,
    USERS_LOCK_REQUEST,
    USERS_LOCK_SUCCESS,
    USERS_REMOVE_FAILURE,
    USERS_REMOVE_REQUEST,
    USERS_REMOVE_SUCCESS,
    USERS_UNLOCK_FAILURE,
    USERS_UNLOCK_REQUEST,
    USERS_UNLOCK_SUCCESS,
    ADMINS_GET_RESET,
    ADMINS_CLEAN,
    USERS_CLEAN,
    LOCKED_GET_RESET,
    LOCKED_CLEAN,
    PAGE_NUMBER_UPDATE,
    HAS_MORE_UPDATE,
    PAGE_NUMBER_RESET,
    SORTING_ENABLED_UPDATE,
    SORTING_TYPE_UPDATE,
    SORTING_TYPE_RESET,
} from "./ActionType";

const initialState = {
    userCreateError: null,
    userDeleteLoading: false,
    deletedUser: null,
    userDeleteError: null,
    userGetByIdLoading: false,
    create: {
        loading: false,
        data: null,
        error: null,
    },
    pageNumbers: {
        Admins: 1,
        Recipients: 1,
        Locked: 1
    },
    hasMore: {
        Admins: true,
        Recipients: true,
        Locked: true,
    },
    admins: {
        all: [],
        total: null,
        loading: false,
        data: null,
        error: null,
    },
    users: {
        all: [],
        total: null,
        loading: false,
        data: null,
        error: null,
        clear: false,
    },
    locked: {
        all: [],
        total: null,
        loading: false,
        data: null,
        error: null,
    },
    sorting: {
        isEnabled: {
            Admins: false,
            Recipients: false,
            Locked: false,
        },
        sortByLastActiveAtOldest: false,
        sortByLastActiveAtLatest: false,
        sortByCreatedAtOldest: false,
        sortByCreatedAtLatest: false,
    },
    update: {
        loading: false,
        data: null,
        error: null
    },
    lock: {
        loading: false,
        data: null,
        error: null,
    },
    remove: {
        loading: false,
        data: null,
        error: null,
    },
    unlock: {
        loading: false,
        data: null,
        error: null,
    },
    update: {
        loading: false,
        data: null,
        error: null,
    }
}

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_CREATE_REQUEST:
            return {
                ...state,
                create: {
                    loading: true,
                }
            };
        case USER_CREATE_SUCCESS:
            return {
                ...state,
                create: {
                    loading: false,
                    data: payload,
                },
                users: {
                    ...state.users,
                    all: [...state.users.all, payload],
                }
            };
        case USER_CREATE_FAILURE:
            return {
                ...state,
                create: {
                    loading: false,
                    error: payload,
                }
            };
        case USER_CREATE_RESET:
            return {
                ...state,
                create: {
                    loading: false,
                    data: null,
                    error: payload,
                }
            };
        case USER_UPDATE_REQUEST:
            return {
                ...state,
                update: {
                    loading: true,
                }
            };
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                update: {
                    loading: false,
                    data: payload,
                }
            };
        case USER_UPDATE_FAILURE:
            return {
                ...state,
                update: {
                    loading: false,
                    error: payload,
                }
            };
        case USER_UPDATE_CLEAN:
            return { ...state, userUpdateError: null };
        case USER_DELETE_REQUEST:
            return { ...state, userDeleteLoading: true };
        case USER_DELETE_SUCCESS:
            return { ...state, userDeleteLoading: false, deleteUser: USER_DELETED };
        case USER_DELETE_FAILURE:
            return { ...state, userDeleteLoading: false, userDeleteError: payload };
        case USER_DELETE_CLEAN:
            return { ...state, userDeleteError: null };
        case USER_GET_BY_ID_REQUEST:
            return { ...state, userGetByIdLoading: true };
        case USER_GET_BY_ID_SUCCESS:
            return { ...state, userGetByIdLoading: false, userById: payload };
        case USER_GET_BY_ID_FAILURE:
            return { ...state, userGetByIdLoading: false, userGetByIdError: payload };
        case USER_GET_BY_ID_CLEAN:
            return { ...state, userGetByIdError: null };
        case ADMINS_GET_REQUEST:
            return {
                ...state,
                admins: {
                    ...state.admins,
                    loading: true,
                }
            }
        case ADMINS_GET_SUCCESS:
            return {
                ...state,
                admins: {
                    ...state.admins,
                    loading: false,
                    data: payload.content,
                    all: [...state?.admins?.all, ...payload.content],
                    total: payload.totalElements,
                }
            }
        case ADMINS_GET_FAILURE:
            return {
                ...state,
                admins: {
                    ...state.admins,
                    loading: false,
                    error: payload
                }
            }
        case ADMINS_GET_RESET:
            return {
                ...state,
                admins: {
                    ...state.admins,
                    loading: false,
                    data: null,
                    error: null,
                }
            }
        case ADMINS_CLEAN:
            return {
                ...state,
                admins: {
                    ...state.admins,
                    all: [],
                    total: null,
                    loading: false,
                    data: null,
                    error: null,
                }
            }
        case USERS_GET_REQUEST:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: true,
                }
            }
        case USERS_GET_SUCCESS:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                    data: payload.content,
                    all: [...state?.users?.all, ...payload.content],
                    total: payload.totalElements,
                }
            }
        case USERS_GET_FAILURE:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                    error: payload
                }
            }
        case USERS_GET_RESET:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                    data: null,
                    error: null,
                }
            }
        case USERS_CLEAN:
            return {
                ...state,
                users: {
                    ...state.users,
                    all: [],
                    total: null,
                    loading: false,
                    data: null,
                    error: null,
                    clear: false,
                }
            }
        case LOCKED_GET_REQUEST:
            return {
                ...state,
                locked: {
                    ...state.locked,
                    loading: true,
                }
            }
        case LOCKED_GET_SUCCESS:
            return {
                ...state,
                locked: {
                    ...state.locked,
                    loading: false,
                    data: payload.content,
                    all: [...state?.locked?.all, ...payload.content],
                    total: payload.totalElements,
                }
            }
        case LOCKED_GET_FAILURE:
            return {
                ...state,
                locked: {
                    ...state.locked,
                    loading: false,
                    error: payload
                }
            }
        case LOCKED_GET_RESET:
            return {
                ...state,
                locked: {
                    ...state.locked,
                    loading: false,
                    data: null,
                    error: null,
                }
            }
        case LOCKED_CLEAN:
            return {
                ...state,
                locked: {
                    ...state.locked,
                    all: [],
                    total: null,
                    loading: false,
                    data: null,
                    error: null,
                },
            }
        case PAGE_NUMBER_UPDATE:
            return {
                ...state,
                pageNumbers: {
                    ...state.pageNumbers,
                    [payload.type]: payload.updatedPageNumber,
                }
            }
        case PAGE_NUMBER_RESET:
            return {
                ...state,
                pageNumbers: {
                    ...state.pageNumbers,
                    [payload.type]: 1,
                }
            }
        case HAS_MORE_UPDATE:
            return {
                ...state,
                hasMore: {
                    ...state.hasMore,
                    [payload.type]: payload.value,
                }
            }
        case SORTING_ENABLED_UPDATE:
            return {
                ...state,
                sorting: {
                    ...state.sorting,
                    isEnabled: {
                        ...state.sorting.isEnabled,
                        [payload.type]: payload.value,
                    }
                }
            }
        case SORTING_TYPE_UPDATE:
            return {
                ...state,
                sorting: {
                    ...state.sorting,
                    sortByLastActiveAtOldest: payload.sortByLastActiveAtOldest,
                    sortByLastActiveAtLatest: payload.sortByLastActiveAtLatest,
                    sortByCreatedAtOldest: payload.sortByCreatedAtOldest,
                    sortByCreatedAtLatest: payload.sortByCreatedAtLatest,
                }
            }
        case SORTING_TYPE_RESET:
            return {...state,
                sorting: {
                    ...state.sorting,
                    sortByLastActiveAtOldest: false,
                    sortByLastActiveAtLatest: false,
                    sortByCreatedAtOldest: false,
                    sortByCreatedAtLatest: false
                }
            }
        case USERS_GET_RESET:
            return {
                ...state,
                locked: {
                    ...state.locked,
                    loading: false,
                    data: null,
                    error: null,
                }
            }
        case USERS_LOCK_REQUEST:
            return {
                ...state,
                lock: {
                    loading: true,
                }
            };
        case USERS_LOCK_SUCCESS:
            return {
                ...state,
                lock: {
                    loading: false,
                    data: payload,
                }
            };
        case USERS_LOCK_FAILURE:
            return {
                ...state,
                lock: {
                    loading: false,
                    error: payload,
                }
            };
        case USERS_REMOVE_REQUEST:
            return {
                ...state,
                remove: {
                    loading: true,
                }
            };
        case USERS_REMOVE_SUCCESS:
            return {
                ...state,
                remove: {
                    loading: false,
                    data: payload,
                }
            };
        case USERS_REMOVE_FAILURE:
            return {
                ...state,
                remove: {
                    loading: false,
                    error: payload,
                }
            };
        case USERS_UNLOCK_REQUEST:
            return {
                ...state,
                unlock: {
                    loading: true,
                }
            };
        case USERS_UNLOCK_SUCCESS:
            return {
                ...state,
                remove: {
                    loading: false,
                    data: payload,
                }
            };
        case USERS_UNLOCK_FAILURE:
            return {
                ...state,
                remove: {
                    loading: false,
                    error: payload,
                }
            };

        default:
            return { ...state };
    }
}