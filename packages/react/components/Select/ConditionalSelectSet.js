import React, { useEffect, useReducer } from 'react';

import stateReducer, {
  getSelectsFromProps,
  canShowAddMore,
} from './conditionalSelectReducer';
import ConditionalSelect from './ConditionalSelect';
import { Fieldset, TextLink } from '..';
import { translate } from '../utilities';

// This is an archive of ConditionalSelectSet and ConditionalSelect in case we want
// to revive these components. See `behaviors-demo.js` for examples of how data should
// be structured. These components would also have to be added to `selectBehavior.js`
// before they are re-enabled.

const ConditionalSelectSet = props => {
  const {
    options,
    defaultValue,
    placeholder,
    childIsMulti,
    addMoreLabel,
    onChange,
  } = props;
  if (!options.length) {
    console.warn(`"${type}" is not a valid type`);
    return null;
  }

  const initialState = {
    options: [],
    defaultValue: [],
    selects: [],
    showAddMore: false,
  };

  const [state, dispatchState] = useReducer(stateReducer, initialState, () => {
    const initialSelects = defaultValue?.length
      ? getSelectsFromProps(options, defaultValue)
      : [{ options, defaultValue: [] }];

    return {
      options,
      defaultValue: defaultValue || [],
      selects: initialSelects,
      showAddMore: canShowAddMore(initialSelects),
    };
  });

  useEffect(() => {
    if (!state.selects.length) {
      dispatchState({
        type: 'ADD_SELECT',
      });
    }
  }, [state]);

  const AddMoreButton = props => {
    const { label } = props;

    const handleAddMoreClick = e => {
      dispatchState({
        type: 'ADD_SELECT',
      });
    };

    return (
      <TextLink type="button" onClick={handleAddMoreClick}>
        {label || translate('Add More')}
      </TextLink>
    );
  };
  return (
    <>
      {state.selects.map(select => {
        return (
          <Fieldset
            legendTitle={placeholder}
            legendAttributes={{
              className: 'u-bolt-visuallyhidden',
            }}>
            <ConditionalSelect
              {...select}
              childIsMulti={childIsMulti}
              onChange={onChange}
              dispatchState={dispatchState}
            />
          </Fieldset>
        );
      })}
      {state.showAddMore && <AddMoreButton label={addMoreLabel} />}
    </>
  );
};

export default ConditionalSelectSet;
