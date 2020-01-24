export const UPDATE_EXPLORER_COMPONENT = 'UPDATE_EXPLORER_COMPONENT';
export const UPDATE_EXPLORER_FORM = 'UPDATE_EXPLORER_FORM';

export const updateComponentExplorerPreview = renderedHTML => (
  dispatch,
  getState,
) => {
  if (getState().componentExplorer.renderedHTML !== renderedHTML) {
    dispatch({
      type: UPDATE_EXPLORER_COMPONENT,
      renderedHTML,
    });
  }
};

export const updateComponentExplorerForm = formData => (dispatch, getState) => {
  if (getState().componentExplorer.formData !== formData) {
    dispatch({
      type: UPDATE_EXPLORER_FORM,
      formData,
    });
  }
};
