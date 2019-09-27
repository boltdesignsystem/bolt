import { html } from '@bolt/core/renderers/renderer-lit-html';
import { svg } from 'lit-html';

export const radar = ({ speed, theme }) => {
  const primaryColor = theme === 'dark' ? '#FFFFFF' : 'rgba(83, 93, 166, .8)';

  const themedStyles =
    theme === 'dark'
      ? `.st4{fill:none;stroke:url(#ring_2_1_);stroke-width:0.5;stroke-dasharray:2.61;}
        .st5{fill:none;stroke:url(#ring_1_1_);stroke-width:0.5;stroke-dasharray:2.61;}
        .st6{fill:#FFFFFF;}`
      : `.st4{fill:none;stroke:#161B3D;stroke-width:0.5;stroke-miterlimit:10;stroke-dasharray:2.61;}
        .st5{fill:#535DA6;}`;

  const authoredStyle = html`
    @keyframes kf_el_vfSwk5hMIQ_an_sEmV6we0Y { 0% {opacity: 0.1;} 30% {opacity:
    0;} 45% {opacity: 1;} 100% {opacity: 0.1;} } @keyframes
    kf_el_aP0xuWOs4-_an_aS5c2oXFS { 0% {opacity: 0.1;} 58.33% {opacity: 0.1;}
    73.33% {opacity: 1;} 100% {opacity: 0.1;} } @keyframes
    kf_el_fzJ7A95FI-_an_ypQmdWKNe { 0% {opacity: 0.9;} 13.33% {opacity: 0;}
    76.67% {opacity: 0.1;} 90% {opacity: 1;} 100% {opacity: 0.9;} } @keyframes
    kf_el_NeV7-4GsdB_an_zwfIwf8-6 { 0% {opacity: 1;} 28.33% {opacity: 0.1;} 90%
    {opacity: 0.1;} 100% {opacity: 1;} } @keyframes
    kf_el_tbKqO34v2S_an_Tu9Y-kZw1 { 0% {transform: translate(74.8799963593483px,
    74.87999725341797px) rotate(0deg) translate(-74.8799963593483px,
    -74.87999725341797px);} 100% {transform: translate(74.8799963593483px,
    74.87999725341797px) rotate(360deg) translate(-74.8799963593483px,
    -74.87999725341797px);} } #el_SpGBbpa5D { transform: translateZ(0);
    }#el_SpGBbpa5D * { animation-duration: 2s; animation-iteration-count:
    infinite; animation-timing-function: cubic-bezier(0, 0, 1, 1); }
    #el_tbKqO34v2S { clip-path: url(#a); } #el_2UN1ufNGj1 { overflow: visible;
    transform: matrix(0.48, 0, 0, -0.48, -0.96, 150.48); } #el_d8_3YPeiQ5 {
    fill: none; stroke: ${primaryColor}; stroke-width: 0.5; stroke-miterlimit:
    10; stroke-dasharray: 2.6087; } #el_qDh9wHf6FM { fill: none; stroke:
    ${primaryColor}; stroke-width: 0.5; stroke-miterlimit: 10; stroke-dasharray:
    2.6087; } #el_NeV7-4GsdB, #el_fzJ7A95FI-, #el_vfSwk5hMIQ, #el_aP0xuWOs4- {
    animation-fill-mode: backwards; animation-timing-function: cubic-bezier(0,
    0, 1, 1); clip-rule: evenodd; fill-rule: evenodd; fill: ${primaryColor}; }
    #el_NeV7-4GsdB { animation-name: kf_el_NeV7-4GsdB_an_zwfIwf8-6; opacity: 1;
    } #el_fzJ7A95FI- { animation-name: kf_el_fzJ7A95FI-_an_ypQmdWKNe; opacity:
    0.9; } #el_vfSwk5hMIQ { animation-name: kf_el_vfSwk5hMIQ_an_sEmV6we0Y;
    opacity: 0.1; } #el_aP0xuWOs4- { animation-name:
    kf_el_aP0xuWOs4-_an_aS5c2oXFS; opacity: 0.1; } #el_tbKqO34v2S_an_Tu9Y-kZw1 {
    animation-fill-mode: backwards; transform: translate(74.8799963593483px,
    74.87999725341797px) rotate(0deg) translate(-74.8799963593483px,
    -74.87999725341797px); animation-name: kf_el_tbKqO34v2S_an_Tu9Y-kZw1;
    animation-timing-function: cubic-bezier(0, 0, 1, 1); }
    .st0{fill:url(#SVGID_1_);} .st1{fill:url(#SVGID_2_);}
    .st2{fill:url(#SVGID_3_);} .st3{fill:url(#SVGID_4_);} ${themedStyles}
  `;

  const gradients =
    theme === 'light'
      ? svg`
      <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="75" y1="2" x2="75" y2="152" gradientTransform="matrix(1 0 0 -1 0 152)">
        <stop  offset="0" style="stop-color:#0089BD;stop-opacity:0.4"/>
        <stop  offset="1" style="stop-color:#50E3C2;stop-opacity:0"/>
      </linearGradient>
      
      <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="0" y1="77" x2="75" y2="77" gradientTransform="matrix(1 0 0 -1 0 152)">
        <stop  offset="0" style="stop-color:#50E3C2;stop-opacity:0.4"/>
        <stop  offset="1" style="stop-color:#0089BD;stop-opacity:0"/>
      </linearGradient>
      
      <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="37.5" y1="77" x2="37.5" y2="152" gradientTransform="matrix(1 0 0 -1 0 152)">
        <stop  offset="0" style="stop-color:#50E3C2;stop-opacity:0"/>
        <stop  offset="1" style="stop-color:#50E3C2;stop-opacity:0.7"/>
      </linearGradient>
      
      <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="45.2488" y1="101.1014" x2="80.5688" y2="130.7414" gradientTransform="matrix(1 0 0 -1 0 152)">
        <stop  offset="9.000000e-02" style="stop-color:#50E3C2;stop-opacity:0"/>
        <stop  offset="1" style="stop-color:#50E3C2"/>
      </linearGradient>
    `
      : svg`
      <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="75" y1="598" x2="75" y2="448" gradientTransform="matrix(1 0 0 1 0 -448)">
        <stop  offset="0" style="stop-color:#50E3C2;stop-opacity:0.4"/>
        <stop  offset="1" style="stop-color:#50E3C2;stop-opacity:0"/>
      </linearGradient>        
      
      <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="0" y1="523" x2="75" y2="523" gradientTransform="matrix(1 0 0 1 0 -448)">
        <stop  offset="0" style="stop-color:#50E3C2;stop-opacity:0.4"/>
        <stop  offset="1" style="stop-color:#50E3C2;stop-opacity:0"/>
      </linearGradient>

      <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="37.5" y1="523" x2="37.5" y2="448" gradientTransform="matrix(1 0 0 1 0 -448)">
        <stop  offset="0" style="stop-color:#50E3C2;stop-opacity:0"/>
        <stop  offset="1" style="stop-color:#50E3C2;stop-opacity:0.7"/>
      </linearGradient>

      <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="45.2333" y1="498.8801" x2="80.5533" y2="469.2401" gradientTransform="matrix(1 0 0 1 0 -448)">
        <stop  offset="9.000000e-02" style="stop-color:#50E3C2;stop-opacity:0"/>
        <stop  offset="1" style="stop-color:#50E3C2"/>
      </linearGradient>
    `;

  return svg`
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 150 150"
      style="enable-background:new 0 0 150 150;"
      xml:space="preserve"
      id="el_SpGBbpa5D"
      height="200px"
      width="200px">
      <style>${authoredStyle}</style>

      ${gradients}
      <g id="el_tbKqO34v2S_an_Tu9Y-kZw1">
        <circle class="st0" cx="75" cy="75" r="75"/>
        <path class="st1" d="M75,0C33.6,0,0,33.6,0,75s33.6,75,75,75V0z"/>
        <path class="st2" d="M75,0C33.6,0,0,33.6,0,75h75V0z"/>
      </g>
   
      <g id="el_WKUVWALNKz">
        <path
          id="el_d8_3YPeiQ5"
          d="M75,126.3c28.2,0,51-23,51-51.3s-22.8-51.3-51-51.3S24,46.6,24,75S46.8,126.3,75,126.3z"
        />
        <path
          id="el_qDh9wHf6FM"
          d="M75,138.4c34.8,0,63-28.4,63-63.4s-28.2-63.4-63-63.4S12,40,12,75S40.2,138.4,75,138.4z"
        />
        <circle id="el_NeV7-4GsdB" cx="52.9" cy="9.1" r="1.6" />
        <circle id="el_fzJ7A95FI-" cx="31.2" cy="64.4" r="1.6" />
        <circle id="el_vfSwk5hMIQ" cx="123.4" cy="104.5" r="1.6" />
        <circle id="el_aP0xuWOs4-" cx="40.5" cy="119.8" r="1.6" />
      </g>
    </svg>
  `;
};
