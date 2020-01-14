import { html } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import { svg } from 'lit-html';

export const connectionBand = ({ direction, theme }) => {
  const authoredStyle = html`
    @keyframes connectionArrowScroll { 0% { transform: translate(80px, 0px)
    translate(-80px, 0px) translate(0px, 0px); } 83.33% { transform:
    translate(80px, 0px) translate(-80px, 0px) translate(423px, 0px); } 100% {
    transform: translate(80px, 0px) translate(-80px, 0px) translate(423px, 0px);
    } } #animatedConnectionBand { transform:
    ${direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}; }
    #animatedConnectionBand * { animation-duration: 1s;
    animation-iteration-count: infinite; animation-timing-function:
    cubic-bezier(0, 0, 1, 1); } #connectionGradientBG { fill:
    url(#connectionGradient); } #connectionDirectionAnchor { transform: translate(-48px) translateZ(0); } #connectionArrows { animation-fill-mode:
    backwards; animation-name: connectionArrowScroll; animation-timing-function:
    cubic-bezier(0, 0, 1, 1); }
  `;
  const gradientColors =
    theme === 'dark'
      ? svg`
      <stop stop-color="#887ACC" offset="0%"></stop>
      <stop stop-color="#887ACC" stop-opacity="0" offset="100%"></stop>`
      : svg`
      <stop stop-color="#7ACCCC" offset="0%"/>
      <stop stop-color="#887ACC"  offset="100%"/>`;

  return svg`
        <svg width="100%" viewBox="0 0 375 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="animatedConnectionBand">
      <style>
      ${authoredStyle}
      </style>
      <defs>
        <linearGradient x1="3.0640354%" y1="50%" x2="100%" y2="50%" id="connectionGradient">
         ${gradientColors}
        </linearGradient>
      </defs>
      <polygon id="connectionGradientBG" points="0 80, 375 80, 375 0, 0 0"/>
      <g id="connectionDirectionAnchor">
        <g id="connectionArrows" fill-rule="evenodd">
          <polygon id="el_aJxwcKruLg" fill="rgba(255,255,255, .3)" points="
            0 1,
            30 40,
            0 79,
            12 79,
            42 40,
            12 1"
          />
          <polygon id="el_2VvY9fEACt" fill="rgba(255,255,255, .55)" points="
              24 1,
              54 40,
              24 79,
              36 79,
              66 40,
              36 1"
          />
          <polygon id="el_U5FIkJzG7h" fill="rgba(255,255,255, 1)" points="
              48 1,
              78 40,
              48 79,
              60 79,
              90 40,
              60 1"
          />
        </g>
      </g>
    </svg>`;
};
