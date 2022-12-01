export const UPDATE_THEME_MODE = 'UPDATE_THEME_MODE';
export const UPDATE_TEST_MODE = 'UPDATE_TEST_MODE';
export const UPDATE_ARCHIVE_MODE = 'UPDATE_DRUPAL_MODE';
export const UPDATE_DRUPAL_MODE = 'UPDATE_ARCHIVE_MODE';
export const UPDATE_LAYOUT_MODE = 'UPDATE_LAYOUT_MODE';
export const UPDATE_DRAWER_ANIMATION_STATE = 'UPDATE_DRAWER_ANIMATION_STATE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const UPDATE_VIEWPORT_PX = 'UPDATE_VIEWPORT_PX';
export const UPDATE_VIEWPORT_EM = 'UPDATE_VIEWPORT_EM';
export const UPDATE_DRAWER_HEIGHT = 'UPDATE_DRAWER_HEIGHT';
export const UPDATE_CURRENT_URL = 'UPDATE_CURRENT_URL';
export const UPDATE_CURRENT_PATTERN = 'UPDATE_CURRENT_PATTERN';
export const IS_VIEWALL_PAGE = 'IS_VIEWALL_PAGE';

export const updateCurrentPattern = currentPattern => (dispatch, getState) => {
  if (getState().app.currentPattern !== currentPattern) {
    dispatch({
      type: UPDATE_CURRENT_PATTERN,
      currentPattern,
    });
  }
};

export const updateCurrentUrl = currentUrl => (dispatch, getState) => {
  if (getState().app.currentUrl !== currentUrl) {
    dispatch({
      type: UPDATE_CURRENT_URL,
      currentUrl,
    });
  }
};

export const updateLayoutMode = layoutMode => (dispatch, getState) => {
  if (getState().app.layoutMode !== layoutMode) {
    dispatch({
      type: UPDATE_LAYOUT_MODE,
      layoutMode,
    });
  }
};

export const updateViewportPx = viewportPx => (dispatch, getState) => {
  if (getState().app.viewportPx !== viewportPx) {
    dispatch({
      type: UPDATE_VIEWPORT_PX,
      viewportPx,
    });
  }
};

export const updateViewportEm = viewportEm => (dispatch, getState) => {
  if (getState().app.viewportEm !== viewportEm) {
    dispatch({
      type: UPDATE_VIEWPORT_EM,
      viewportEm,
    });
  }
};

export const updateThemeMode = themeMode => (dispatch, getState) => {
  if (getState().app.themeMode !== themeMode) {
    dispatch({
      type: UPDATE_THEME_MODE,
      themeMode,
    });
  }
};

export const updateTestMode = testMode => (dispatch, getState) => {
  if (getState().app.testMode !== testMode) {
    dispatch({
      type: UPDATE_TEST_MODE,
      testMode,
    });
  }
};

export const updateArchiveMode = archiveMode => (dispatch, getState) => {
  if (getState().app.archiveMode !== archiveMode) {
    dispatch({
      type: UPDATE_ARCHIVE_MODE,
      archiveMode,
    });
  }
};

export const updateDrupalMode = drupalMode => (dispatch, getState) => {
  if (getState().app.drupalMode !== drupalMode) {
    dispatch({
      type: UPDATE_DRUPAL_MODE,
      drupalMode,
    });
  }
};

export const updateDrawerState = opened => (dispatch, getState) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened,
    });
  }
};

export const updateDrawerAnimationState = drawerIsAnimating => (
  dispatch,
  getState,
) => {
  if (getState().app.drawerIsAnimating !== drawerIsAnimating) {
    dispatch({
      type: UPDATE_DRAWER_ANIMATION_STATE,
      drawerIsAnimating,
    });
  }
};

export const updateDrawerHeight = height => (dispatch, getState) => {
  if (getState().app.drawerHeight !== height) {
    dispatch({
      type: UPDATE_DRAWER_HEIGHT,
      height,
    });
  }
};

export const isViewallPage = isViewall => (dispatch, getState) => {
  if (getState().app.isViewallPage !== isViewall) {
    dispatch({
      type: IS_VIEWALL_PAGE,
      isViewall,
    });
  }
};
