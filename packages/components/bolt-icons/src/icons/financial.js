import { h } from '@bolt/core/renderers';

export const Financial = ({ bgColor, fgColor, size, title, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 26 32">
      <title>{title}</title>
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M2 30h22V2H2zM24 0H2a2 2 0 00-2 2v28a2 2 0 002 2h22a2 2 0 002-2V2a2 2 0 00-2-2z"
        data-name="Fill-1"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M6 10.7h14v-5H6zm-2 2h18v-9H4z"
        data-name="Fill-3"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M6 18.3h2v-2H6v2z"
        data-name="Fill-4"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M10 18.3h2v-2h-2v2z"
        data-name="Fill-5"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M14 18.3h2v-2h-2v2z"
        data-name="Fill-6"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M18 18.3h2v-2h-2v2z"
        data-name="Fill-7"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M6 22.3h2v-2H6v2z"
        data-name="Fill-8"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M10 22.3h2v-2h-2v2z"
        data-name="Fill-9"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M14 22.3h2v-2h-2v2z"
        data-name="Fill-10"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M18 22.3h2v-2h-2v2z"
        data-name="Fill-11"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M6 26.3h2v-2H6v2z"
        data-name="Fill-12"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M10 26.3h2v-2h-2v2z"
        data-name="Fill-13"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M14 26.3h2v-2h-2v2z"
        data-name="Fill-14"
      />
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M18 26.3h2v-2h-2v2z"
        data-name="Fill-15"
      />
    </svg>
  );
};
