import { UPDATE_EXPLORER_FORM, UPDATE_EXPLORER_COMPONENT } from './actions.js';

export const app = (state = {}, action) => {
  switch (action.type) {
    // case UPDATE_COMPONENT_EXPLORER:
    //   return {
    //     ...state,
    //     renderedHTML: action.renderedHTML,
    //   };
    default:
      return state;
  }
};

export const componentExplorer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EXPLORER_COMPONENT:
      return {
        ...state,
        renderedHTML: action.renderedHTML,
      };
    case UPDATE_EXPLORER_FORM:
      return {
        ...state,
        formData: action.formData,
      };
    default:
      return state;
  }
};
