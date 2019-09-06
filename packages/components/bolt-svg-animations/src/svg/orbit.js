import { html } from '@bolt/core/renderers/renderer-lit-html';
import { svg } from 'lit-html';

export const orbit = ({ speed }) => {
  const authoredStyle = html`
    #el_4FVBcL2d5 { overflow: visible; transform: translateZ(0);}
    @-webkit-keyframes kf_el_3_mf5AZNVo_an_9jFWXwODG { 0% { -webkit-transform:
    translate(75px, 75px) rotate(0deg) translate(-75px, -75px); transform:
    translate(75px, 75px) rotate(0deg) translate(-75px, -75px); } 100% {
    -webkit-transform: translate(75px, 75px) rotate(360deg) translate(-75px,
    -75px); transform: translate(75px, 75px) rotate(360deg) translate(-75px,
    -75px); } } @keyframes kf_el_3_mf5AZNVo_an_9jFWXwODG { 0% {
    -webkit-transform: translate(75px, 75px) rotate(0deg) translate(-75px,
    -75px); transform: translate(75px, 75px) rotate(0deg) translate(-75px,
    -75px); } 100% { -webkit-transform: translate(75px, 75px) rotate(360deg)
    translate(-75px, -75px); transform: translate(75px, 75px) rotate(360deg)
    translate(-75px, -75px); } } #el_4FVBcL2d5 * { -webkit-animation-duration:
    ${speed}ms; animation-duration: ${speed}ms;
    -webkit-animation-iteration-count: infinite; animation-iteration-count:
    infinite; -webkit-animation-timing-function: cubic-bezier(0, 0, 1, 1);
    animation-timing-function: cubic-bezier(0, 0, 1, 1); } #el_3_mf5AZNVo {
    stroke: none; stroke-width: 1; fill: none; } #el_Kq0Ppgd0n6 { stroke:
    #535DA6; stroke-width: 0.914634146; } #el_XZMv5KV-BQ { fill: #009999; }
    #el_D9rhYqcKss { fill: #009999; } #el_GmGtSmeZzg { fill: #009999; }
    #el_3_mf5AZNVo_an_9jFWXwODG { -webkit-animation-fill-mode: backwards;
    animation-fill-mode: backwards; -webkit-transform: translate(75px, 75px)
    rotate(0deg) translate(-75px, -75px); transform: translate(75px, 75px)
    rotate(0deg) translate(-75px, -75px); -webkit-animation-name:
    kf_el_3_mf5AZNVo_an_9jFWXwODG; animation-name:
    kf_el_3_mf5AZNVo_an_9jFWXwODG; -webkit-animation-timing-function:
    cubic-bezier(0, 0, 1, 1); animation-timing-function: cubic-bezier(0, 0, 1,
    1); }
  `;

  return svg`
    <svg
      id="el_4FVBcL2d5"
      viewBox="0 0 152 152"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      height="200px"
      width="200px">
      <style>${authoredStyle}</style>
      <g
        id="el_3_mf5AZNVo_an_9jFWXwODG"
        data-animator-group="true"
        data-animator-type="1">
        <g fill-rule="evenodd" id="el_3_mf5AZNVo">
          <path
            d="M75,150 C116.421356,150 150,116.421356 150,75 C150,33.5786438 116.421356,0 75,0 C33.5786438,0 0,33.5786438 0,75 C0,116.421356 33.5786438,150 75,150 Z"
            id="el_Kq0Ppgd0n6"
            stroke-dasharray="3.658536585365854"
          />
          <circle
            id="el_XZMv5KV-BQ"
            cx="15.5487805"
            cy="29.2682927"
            r="4.57317073"
          />
          <circle
            id="el_D9rhYqcKss"
            cx="128.963415"
            cy="126.219512"
            r="4.57317073"
          />
          <circle
            id="el_GmGtSmeZzg"
            cx="34.7560976"
            cy="138.109756"
            r="4.57317073"
          />
        </g>
      </g>
    </svg>
  `;
};
