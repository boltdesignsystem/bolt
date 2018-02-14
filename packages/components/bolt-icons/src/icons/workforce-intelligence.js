// import { Preact, h } from '@bolt/core';
const WorkforceIntelligence = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/product/Platform/workforce-intelligence</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path d="M30 18h-4.713l2 2H30v3c0 .667-.334 1-1 1H3c-.667 0-1-.333-1-1v-3h7.684a9.564 9.564 0 0 1-1.921-2H2V3c0-.666.333-1 1-1h26c.666 0 1 .334 1 1v15zM12 30h8v-4h-8v4zM31.437.563C31.062.188 30.583 0 30 0H2C1.416 0 .937.188.562.563.187.938 0 1.417 0 2v22c0 .584.187 1.063.562 1.438.375.375.854.562 1.438.562h8v4H8v2h16v-2h-2v-4h8c.583 0 1.062-.187 1.437-.562.375-.375.563-.854.563-1.438V2c0-.583-.188-1.062-.563-1.437z" />
        <path d="M15.518 18.035A5.524 5.524 0 0 1 10 12.517 5.524 5.524 0 0 1 15.518 7a5.524 5.524 0 0 1 5.518 5.517 5.524 5.524 0 0 1-5.518 5.518m5.968-.964a7.469 7.469 0 0 0 1.55-4.554C23.036 8.372 19.664 5 15.518 5S8 8.372 8 12.517c0 4.145 3.372 7.518 7.518 7.518a7.471 7.471 0 0 0 4.554-1.55l4.22 4.222a1 1 0 0 0 1.415-1.414l-4.221-4.222z" />
      </g>
    </svg>
  );
};
export default WorkforceIntelligence;
