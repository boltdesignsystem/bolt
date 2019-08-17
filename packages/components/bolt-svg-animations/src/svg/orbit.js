import { h } from '@bolt/core/renderers';

export const Orbit = ({ speed }) => {
  const authoredStyle = `
  #bolt-orbit-container {
    animation: ${speed}ms linear infinite spin;
    display: flex;
  }
  
  #bolt-orbit-svg {
    margin: auto;
  }

  @keyframes spin {
    100% {
      transform: rotateZ(-360deg);
    }
  }`;

  return (
    <div id="bolt-orbit-container">
      <svg id="bolt-orbit-svg" width="152px" height="152px" viewBox="0 0 152 152" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <style>
          {authoredStyle}
        </style>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path d="M75,150 C116.421356,150 150,116.421356 150,75 C150,33.5786438 116.421356,0 75,0 C33.5786438,0 0,33.5786438 0,75 C0,116.421356 33.5786438,150 75,150 Z" id="Mask" stroke="#535DA6" stroke-width="0.914634146" stroke-dasharray="3.658536585365854"></path>
          <circle id="dot" fill="#009999" cx="15.5487805" cy="29.2682927" r="4.57317073"></circle>
          <circle id="dot" fill="#009999" cx="128.963415" cy="126.219512" r="4.57317073"></circle>
          <circle id="dot" fill="#009999" cx="34.7560976" cy="138.109756" r="4.57317073"></circle>
        </g>
      </svg>
    </div>
  )
}
