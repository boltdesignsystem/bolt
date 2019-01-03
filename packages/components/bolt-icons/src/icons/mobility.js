
  import { h } from '@bolt/core/renderers';

  export const Mobility = ({ bgColor, fgColor, size, ...otherProps }) => {
      return (
        <svg data-name="Layer 1" {...otherProps} viewBox="0 0 20 32"><path fill={bgColor} fill-rule="evenodd" d="M8.6 27.4a1.72 1.72 0 0 1-.2-2.4 1.7 1.7 0 0 1 2.3-.7 1.71 1.71 0 0 1 1.2 2.1c-.1 1-.7 1.5-1.8 1.6a1.75 1.75 0 0 1-1.5-.6zM18 22H2v6a1.68 1.68 0 0 0 .6 1.4A2.25 2.25 0 0 0 4 30h12a1.68 1.68 0 0 0 1.4-.6A2.25 2.25 0 0 0 18 28zm0-18a1.68 1.68 0 0 0-.6-1.4A2.25 2.25 0 0 0 16 2H4a1.68 1.68 0 0 0-1.4.6A2.25 2.25 0 0 0 2 4v16h16V4zm2 0v24a4.1 4.1 0 0 1-4 4H4a3.78 3.78 0 0 1-2.8-1.2A3.78 3.78 0 0 1 0 28V4a3.78 3.78 0 0 1 1.2-2.8A3.78 3.78 0 0 1 4 0h12a3.78 3.78 0 0 1 2.8 1.2A3.78 3.78 0 0 1 20 4z" data-name="Page-1"/></svg>
      )
};
