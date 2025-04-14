import {
  ACTIVE_FOOTER_SUBMIT,
  ADD_RECIPIENT,
  DECREASE_STEPPER_COUNT,
  FETCH_ALL_CATEGORIES,
  FETCH_ALL_TEMPLATE_BY_CATEGORYID,
  FETCH_CURRENT_TEMPLATE_STRUCTURE,
  INACTIVE_FOOTER_SUBMIT,
  PROCESS_SUBMIT_CLICK,
  REMOVE_RECIPIENT,
  RESET_ALL_TEMPLATES,
  RESET_STATE,
  SET_ALL_TEMPLATES,
  SET_CURRENT_SELECTED_RECIPIENT,
  SET_SELECTED_CATEGORY,
  SET_SELECTED_OPEN_MENU_ID,
  SET_SELECTED_TEMPLATE,
} from "./ActionType";
import {
  FETCH_STATISTICS_REQUEST,
  FETCH_STATISTICS_SUCCESS,
  FETCH_STATISTICS_FAILURE,
  FETCH_SCHEDULE_REQUEST,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE,
} from "./ActionType";

const initialState = {
  data: null,
  dataLoading: false,
  dataError: null,
  scheduleRequestInfoData: null,
  scheduleRequestLoading: false,
  scheduleRequestError: null,
  categories: [],
  stepperValue: 0,
  footerSubmitStatus: false,
  templates: [],
  selectedTemplate: null,
  selectedCategory: null,
  currentTemplateStructure: null,
  selectedRecipients: [],
  selectedOpenMenuId: null,
  currentSelectedRecipient: null,
};

export const certificateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STATISTICS_REQUEST:
      return { ...state, dataLoading: true };
    case FETCH_STATISTICS_SUCCESS:
      return { ...state, dataLoading: false, data: payload };
    case FETCH_STATISTICS_FAILURE:
      return { ...state, dataLoading: false, dataError: payload };
    case FETCH_SCHEDULE_REQUEST:
      return { ...state, scheduleRequestLoading: true };
    case FETCH_SCHEDULE_SUCCESS:
      return {
        ...state,
        scheduleRequestLoading: false,
        scheduleRequestInfoData: payload,
      };
    case FETCH_SCHEDULE_FAILURE:
      return {
        ...state,
        scheduleRequestLoading: false,
        scheduleRequestError: payload,
      };
    case FETCH_ALL_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case ACTIVE_FOOTER_SUBMIT:
      return {
        ...state,
        footerSubmitStatus: true,
      };

    case INACTIVE_FOOTER_SUBMIT:
      return {
        ...state,
        footerSubmitStatus: false,
      };

    case PROCESS_SUBMIT_CLICK:
      return {
        ...state,
        stepperValue: payload + 1,
        footerSubmitStatus: false,
      };

    case DECREASE_STEPPER_COUNT:
      return {
        ...state,
        stepperValue: payload - 1,
      };

    case RESET_ALL_TEMPLATES:
      return {
        ...state,
        templates: [],
      };
    case SET_ALL_TEMPLATES:
      return {
        ...state,
        templates: payload,
      };

    case FETCH_ALL_TEMPLATE_BY_CATEGORYID:
      return {
        ...state,
        templates: payload,
      };
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: payload,
      };
    case SET_SELECTED_TEMPLATE:
      return {
        ...state,
        selectedTemplate: payload,
      };
    case FETCH_CURRENT_TEMPLATE_STRUCTURE:
      return {
        ...state,
        currentTemplateStructure: payload,
      };

    case ADD_RECIPIENT:
      return {
        ...state,
        selectedRecipients: [...state.selectedRecipients, payload],
      };

    case REMOVE_RECIPIENT:
      return {
        ...state,
        selectedRecipients: state.selectedRecipients.filter(
          (recipient) => recipient !== payload
        ),
      };

    case SET_SELECTED_OPEN_MENU_ID:
      return {
        ...state,
        selectedOpenMenuId: payload,
      };
    case SET_CURRENT_SELECTED_RECIPIENT:
      return {
        ...state,
        currentSelectedRecipient: payload,
      };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
