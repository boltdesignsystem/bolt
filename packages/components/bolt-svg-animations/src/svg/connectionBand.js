import { html } from '@bolt/core/renderers/renderer-lit-html';
import { svg } from 'lit-html';

export const ConnectionBand = ({ direction }) => {
  const authoredStyle = html`
    @keyframes connectionArrowScroll { 0% { transform:
    translate(82.3648681640625px, 0px) translate(-82.3648681640625px, 0px)
    translate(0px, 0px); } 83.33% { transform: translate(82.3648681640625px,
    0px) translate(-82.3648681640625px, 0px) translate(297px, 0px); } 100% {
    transform: translate(82.3648681640625px, 0px) translate(-82.3648681640625px,
    0px) translate(297px, 0px); } } #animatedConnectionBand * {
    animation-duration: 1s; animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0, 0, 1, 1); } #connectionGradientBG
    { transform: translate(-28px, 0px); fill: url(#connectionGradient); }
    #connectionDirectionAnchor { transform:
    ${direction === 'right'
      ? 'translate(380px) scaleX(-1)'
      : 'translate(-140px)'}
    translateZ(0); } #connectionArrows { animation-fill-mode: backwards;
    animation-name: connectionArrowScroll; animation-timing-function:
    cubic-bezier(0, 0, 1, 1); }
  `;

  return svg`
    <svg width="100%" viewBox="0 0 249 58" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="animatedConnectionBand">
      <style>
      ${authoredStyle}
      </style>
      <defs>
        <linearGradient x1="3.0640354%" y1="50%" x2="100%" y2="50%" id="connectionGradient">
          <stop stop-color="#7ACCCC" offset="0%"/>
          <stop stop-color="#7ACCCC" stop-opacity="0" offset="100%"/>
        </linearGradient>
      </defs>
      <polygon id="connectionGradientBG" points="27.9324324 57.4358974 276.459459 57.4358974 276.459459 0 27.9324324 0"/>
      <g id="connectionDirectionAnchor">
        <g id="connectionArrows" fill-rule="evenodd">
          <polygon id="el_aJxwcKruLg" fill="rgba(255,255,255, .3)" points="82.3648649 0 102.092324 28.7186667 82.3648649 57.4358974 91.2867703 57.4358974 111.013514 28.7186667 91.2867703 0"/>
          <polygon id="el_2VvY9fEACt" fill="rgba(255,255,255, .55)" points="99.5540541 0 119.281514 28.7186667 99.5540541 57.4358974 108.475959 57.4358974 128.202703 28.7186667 108.475959 0"/>
          <polygon id="el_U5FIkJzG7h" fill="rgba(255,255,255, 1)" points="116.743243 0 136.470703 28.7186667 116.743243 57.4358974 125.665149 57.4358974 145.391892 28.7186667 125.665149 0"/>
        </g>
      </g>
    </svg>`;
};
