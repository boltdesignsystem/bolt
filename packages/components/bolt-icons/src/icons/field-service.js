
  import { h } from '@bolt/core/renderers';

  export const FieldService = ({ bgColor, fgColor, size, ...otherProps }) => {
      return (
        <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32"><path fill={bgColor} fill-rule="evenodd" d="M16 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14zm0-30a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm0 6A10 10 0 0 0 6 16h2a8 8 0 0 1 16 0h2A10 10 0 0 0 16 6zm-2 19h2v-2h-2zm6.5-10.9a1 1 0 0 0-1.4.4L15.5 21H15a3 3 0 1 0 3 3 2.79 2.79 0 0 0-.8-2l3.6-6.5a1 1 0 0 0-.3-1.4z" data-name="Page-1"/></svg>
      )
};
