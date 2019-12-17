import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const ExternalLink = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <g fill={bgColor}>
          <path d="M18 11.977c-.55 0-1 .45-1 1v6c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-11c0-.55.45-1 1-1h6c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.656 0-3 1.344-3 3v11c0 1.656 1.344 3 3 3h11c1.656 0 3-1.344 3-3v-6c0-.55-.45-1-1-1" />
          <path d="M22 2.94v-.03a.939.939 0 00-.069-.3v-.012s0-.006-.006-.006a1.104 1.104 0 00-.156-.256l-.006-.006-.006-.006-.006-.006v-.006c-.025-.025-.044-.05-.069-.069h-.006l-.006-.006s-.006 0-.006-.006h-.006l-.006-.006a.812.812 0 00-.256-.156H21.378a.966.966 0 00-.3-.069H15.01c-.55 0-1 .45-1 1s.45 1 1 1h3.588l-9.3 9.275a1.005 1.005 0 000 1.413.999.999 0 001.412 0l9.294-9.294v3.588c0 .55.45 1 1 1s1-.45 1-1V2.945L22 2.94z" />
        </g>
      </g>
    </svg>
  );
};

Icons.set('external-link', ExternalLink);
