import { h } from '@bolt/core/renderers';

export const Automation = ({ speed }) => {
  const authoredStyle = `

    #bolt-automation-container {
      max-height: 400px;
      max-width: 400px;
    }
    
    @keyframes kf_line1 {
      0% {

          transform: translate(70.80000305175781px, 0px) translate(-70.80000305175781px, 0px) translate(0px, 37px);
      }

      16.67% {

          transform: translate(70.80000305175781px, 0px) translate(-70.80000305175781px, 0px) translate(0px, -30px);
      }

      50% {

          transform: translate(70.80000305175781px, 0px) translate(-70.80000305175781px, 0px) translate(0px, -30px);
      }

      66.67% {

          transform: translate(70.80000305175781px, 0px) translate(-70.80000305175781px, 0px) translate(0px, 37px);
      }

      100% {
      
          transform: translate(70.80000305175781px, 0px) translate(-70.80000305175781px, 0px) translate(0px, 37px);
      }
  }

  @keyframes kf_line2 {
      4.17% {
  
          transform: translate(74.64534759521484px, 20.724998474121094px) translate(-74.64534759521484px, -20.724998474121094px) translate(-26px, 26px);
      }

      21.67% {
      
          transform: translate(74.64534759521484px, 20.724998474121094px) translate(-74.64534759521484px, -20.724998474121094px) translate(26px, -26px);
      }

      55.00% {
    
          transform: translate(74.64534759521484px, 20.724998474121094px) translate(-74.64534759521484px, -20.724998474121094px) translate(26px, -26px);
      }

      70.83% {

          transform: translate(74.64534759521484px, 20.724998474121094px) translate(-74.64534759521484px, -20.724998474121094px) translate(-26px, 26px);
      }

      0% {
        
          transform: translate(74.64534759521484px, 20.724998474121094px) translate(-74.64534759521484px, -20.724998474121094px) translate(-26px, 26px);
      }

      100% {
      
          transform: translate(74.64534759521484px, 20.724998474121094px) translate(-74.64534759521484px, -20.724998474121094px) translate(-26px, 26px);
      }
  }

  @keyframes kf_line6 {
      21.67% {
        
          transform: translate(20.69999885559082px, 74.63638305664062px) translate(-20.69999885559082px, -74.63638305664062px) translate(26px, -26px);
      }

      37.50% {

          transform: translate(20.69999885559082px, 74.63638305664062px) translate(-20.69999885559082px, -74.63638305664062px) translate(-26px, 26px);
      }

      75% {

          transform: translate(20.69999885559082px, 74.63638305664062px) translate(-20.69999885559082px, -74.63638305664062px) translate(-26px, 26px);
      }

      92.50% {
      
          transform: translate(20.69999885559082px, 74.63638305664062px) translate(-20.69999885559082px, -74.63638305664062px) translate(26px, -26px);
      }

      0% {

          transform: translate(20.69999885559082px, 74.63638305664062px) translate(-20.69999885559082px, -74.63638305664062px) translate(26px, -26px);
      }

      100% {
          transform: translate(20.69999885559082px, 74.63638305664062px) translate(-20.69999885559082px, -74.63638305664062px) translate(26px, -26px);
      }
  }

  @keyframes kf_line3 {
    8.33% {
        transform: translate(75px, 70.5999984741211px) translate(-75px, -70.5999984741211px) translate(-36px, 0px);
    }

    25% {
        transform: translate(75px, 70.5999984741211px) translate(-75px, -70.5999984741211px) translate(30px, 0px);
    }

    58.33% {
        transform: translate(75px, 70.5999984741211px) translate(-75px, -70.5999984741211px) translate(30px, 0px);
    }

    75% {
        transform: translate(75px, 70.5999984741211px) translate(-75px, -70.5999984741211px) translate(-36px, 0px);
    }

    0% {
        transform: translate(75px, 70.5999984741211px) translate(-75px, -70.5999984741211px) translate(-36px, 0px);
    }

    100% {
        transform: translate(75px, 70.5999984741211px) translate(-75px, -70.5999984741211px) translate(-36px, 0px);
    }
  }

  @keyframes kf_line4 {
      12.50% {

          transform: translate(74.6353759765625px, 74.64634704589844px) translate(-74.6353759765625px, -74.64634704589844px) translate(-26px, -26px);
      }

      32.17% {

          transform: translate(74.6353759765625px, 74.64634704589844px) translate(-74.6353759765625px, -74.64634704589844px) translate(26px, 26px);
      }

      62.50% {

          transform: translate(74.6353759765625px, 74.64634704589844px) translate(-74.6353759765625px, -74.64634704589844px) translate(26px, 26px);
      }

      76.17% {

          transform: translate(74.6353759765625px, 74.64634704589844px) translate(-74.6353759765625px, -74.64634704589844px) translate(-26px, -26px);
      }

      0% {

          transform: translate(74.6353759765625px, 74.64634704589844px) translate(-74.6353759765625px, -74.64634704589844px) translate(-26px, -26px);
      }

      100% {

          transform: translate(74.6353759765625px, 74.64634704589844px) translate(-74.6353759765625px, -74.64634704589844px) translate(-26px, -26px);
      }
  }

  @keyframes kf_line8 {
      33.33% {

          transform: translate(20.799999237060547px, 20.662216186523438px) translate(-20.799999237060547px, -20.662216186523438px) translate(26px, 26px);
      }

      50% {

          transform: translate(20.799999237060547px, 20.662216186523438px) translate(-20.799999237060547px, -20.662216186523438px) translate(-26px, -26px);
      }

      83.33% {

          transform: translate(20.799999237060547px, 20.662216186523438px) translate(-20.799999237060547px, -20.662216186523438px) translate(-26px, -26px);
      }

      100% {
        
          transform: translate(20.799999237060547px, 20.662216186523438px) translate(-20.799999237060547px, -20.662216186523438px) translate(26px, 26px);
      }

      0% {
  
          transform: translate(20.799999237060547px, 20.662216186523438px) translate(-20.799999237060547px, -20.662216186523438px) translate(26px, 26px);
      }
  }

  @keyframes kf_line5 {
    20.83% {
        transform: translate(70.5999984741211px, 75px) translate(-70.5999984741211px, -75px) translate(0px, -37px);
    }

    33.33% {
        transform: translate(70.5999984741211px, 75px) translate(-70.5999984741211px, -75px) translate(0px, 30px);
    }

    63.33% {
        transform: translate(70.5999984741211px, 75px) translate(-70.5999984741211px, -75px) translate(0px, 30px);
    }

    83.17% {
        transform: translate(70.5999984741211px, 75px) translate(-70.5999984741211px, -75px) translate(0px, -37px);
    }

    0% {
        transform: translate(70.5999984741211px, 75px) translate(-70.5999984741211px, -75px) translate(0px, -37px);
    }

    100% {
        transform: translate(70.5999984741211px, 75px) translate(-70.5999984741211px, -75px) translate(0px, -37px);
    }
  }

  @keyframes kf_line7 {
      29.17% {
          transform: translate(0px, 70.80000305175781px) translate(0px, -70.80000305175781px) translate(36px, 0px);
      }

      45.83% {
          transform: translate(0px, 70.80000305175781px) translate(0px, -70.80000305175781px) translate(-30px, 0px);
      }

      79.17% {
          transform: translate(0px, 70.80000305175781px) translate(0px, -70.80000305175781px) translate(-30px, 0px);
      }

      95.83% {
          transform: translate(0px, 70.80000305175781px) translate(0px, -70.80000305175781px) translate(36px, 0px);
      }

      0% {
          transform: translate(0px, 70.80000305175781px) translate(0px, -70.80000305175781px) translate(36px, 0px);
      }

      100% {
          transform: translate(0px, 70.80000305175781px) translate(0px, -70.80000305175781px) translate(36px, 0px);
      }
  }

 

  #el_gXuR0UKW0 * {
      animation-duration: ${speed}ms;
      animation-iteration-count: 1;
      animation-timing-function: ease;  animation-iteration-count: infinite;
  }

  #el_4SrIO-NU3e {
      fill: #000000;
  }

  #el_f2h4TxhdJ4 {
      fill: #000000;
  }

  #el_uVK02C_rOM {
      fill: #000000;
  }

  #el_VsqLZlRVcI {
      fill: #000000;
  }

  #el_zU76su1rC7 {
      fill: #000000;
  }

  #el_7DHFC1d-8yl {
      fill: #000000;
  }

  #el_0TQLy4rZAFa {
      fill: #000000;
  }

  #el_hbA3uN6yGXX {
      fill: #000000;
  }

  #el_1zmj7J0CXbF {
      fill: #000000;
      transform: matrix(0.7071, -0.7071, 0.7071, 0.7071, -10.5656, 25.5076);
  }

  #el_28gxd77diFP {
      fill: #000000;
  }

  #el_DCIQTZUjvbj {
      fill: #000000;
      transform: matrix(0.7071, -0.7071, 0.7071, 0.7071, -30.7732, 74.293);
  }

  #el_bFcigZ5U8nt {
      fill: #000000;
  }

  #el_w-4mRssGAdt {
      fill: #000000;
      transform: matrix(0.7071, -0.7071, 0.7071, 0.7071, -51.5275, 124.3984);
  }

  #el_FSUT4oUoPWw {
      fill: #000000;
  }

  #el_FUdCGwmldWw {
      fill: #000000;
      transform: matrix(0.7071, -0.7071, 0.7071, 0.7071, -31.3589, 75.707);
  }

  #el_pAU8zCVpjzd {
      fill: #000000;
  }

  #el_ov2W8FYkaoZ {
      fill: #000000;
      transform: matrix(0.7071, -0.7071, 0.7071, 0.7071, -80.5583, 54.4995);
  }

  #el_pN8jo68f4rw {
      fill: #000000;
  }

  #el_3jMEQqFnTKm {
      fill: #000000;
      transform: matrix(0.7071, -0.7071, 0.7071, 0.7071, -31.773, 74.7071);
  }

  #el_mB8CQsX1ZXf {
      fill: #000000;
  }

  #el_CzsYCmcxmp8 {
      fill: #000000;
      transform: matrix(0.7071, -0.7071, 0.7071, 0.7071, 18.3324, 95.4615);
  }

  #el_vDXE1ywI1Ng {
      fill: #000000;
  }

  #el_3oyaiVNAY7y {
      fill: #000000;
      transform: matrix(0.7071, -0.7071, 0.7071, 0.7071, -30.359, 75.2929);
  }

  #el_j6siMw4IzOB {
      fill: #000000;
  }

  #line1 {
      transform: translate(70.80000305175781px, 0px) translate(-70.80000305175781px, 0px) translate(0px, 37px);
      animation-fill-mode: backwards;
      animation-name: kf_line1;
      animation-timing-function: ease;  animation-iteration-count: infinite;
      animation-iteration-count: infinite;
  }

  #line5 {
      animation-fill-mode: backwards;
      transform: translate(70.5999984741211px, 75px) translate(-70.5999984741211px, -75px) translate(0px, -37px);
      animation-name: kf_line5;
      animation-timing-function: ease;  animation-iteration-count: infinite;
  }

  #line7 {
      animation-fill-mode: backwards;
      transform: translate(0px, 70.80000305175781px) translate(0px, -70.80000305175781px) translate(36px, 0px);
      animation-name: kf_line7;
      animation-timing-function: ease;  animation-iteration-count: infinite;
  }

  #line3 {
      animation-fill-mode: backwards;
      transform: translate(75px, 70.5999984741211px) translate(-75px, -70.5999984741211px) translate(-36px, 0px);
      animation-name: kf_line3;
      animation-timing-function: ease;  animation-iteration-count: infinite;
  }

  #line8 {
      animation-fill-mode: backwards;
      transform: translate(20.799999237060547px, 20.662216186523438px) translate(-20.799999237060547px, -20.662216186523438px) translate(26px, 26px);
      animation-name: kf_line8;
      animation-timing-function: ease;  animation-iteration-count: infinite;
  }

  #line4 {
      animation-fill-mode: backwards;
      transform: translate(74.6353759765625px, 74.64634704589844px) translate(-74.6353759765625px, -74.64634704589844px) translate(-26px, -26px);
      animation-name: kf_line4;
      animation-timing-function: ease;  animation-iteration-count: infinite;
  }

  #line6 {
      animation-fill-mode: backwards;
      transform: translate(20.69999885559082px, 74.63638305664062px) translate(-20.69999885559082px, -74.63638305664062px) translate(26px, -26px);
      animation-name: kf_line6;
      animation-timing-function: ease;  animation-iteration-count: infinite;
  }

  #line2 {
      animation-fill-mode: backwards;
      transform: translate(74.64534759521484px, 20.724998474121094px) translate(-74.64534759521484px, -20.724998474121094px) translate(-26px, 26px);
      animation-name: kf_line2;
      animation-timing-function: ease;  animation-iteration-count: infinite;
  }
  `
  return (
    <div id="bolt-automation-container">
      <svg id="bolt-automation-svg" version="1.1" id="el_gXuR0UKW0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-40 -40 230 230" style="enable-background:new 0 0 150 150;" xml:space="preserve">
      <style>
        {authoredStyle}
      </style>

      <title>automation_model</title>
      <g id="line1" data-animator-group="true" data-animator-type="0"><g id="el_dGAPtPCPIB">
        <g id="el_wKGu3B9p3H">
          <rect x="74.5" y="4" width="1" height="71" id="el_4SrIO-NU3e"/>
        </g>
        <g id="el_GjsxKTyhLE">
          <g id="el_C6FS_KLiSb">
            <path d="M70.8,4.2C70.8,1.9,72.7,0,75,0s4.2,1.9,4.2,4.2c0,2.3-1.9,4.2-4.2,4.2S70.8,6.5,70.8,4.2z" id="el_f2h4TxhdJ4"/>
          </g>
        </g>
      </g></g>
      <g id="line5" data-animator-group="true" data-animator-type="0"><g id="el_CNMBzbOWvh">
        <g id="el_DBOgOPzkcy">
          <rect x="74.5" y="75" width="1" height="70.9" id="el_uVK02C_rOM"/>
        </g>
        <g id="el_-o8CQInCCY">
          <g id="el_6ozJ0cyy8P">
            <path d="M79.4,145.6c0,2.4-2,4.4-4.4,4.4s-4.4-2-4.4-4.4c0-2.4,2-4.4,4.4-4.4S79.4,143.2,79.4,145.6z" id="el_VsqLZlRVcI"/>
          </g>
        </g>
      </g></g>
      <g id="line7" data-animator-group="true" data-animator-type="0"><g id="el_z-onDQzUf2">
        <g id="el_TRWwizoc5s">
          <rect x="4" y="74.5" width="71" height="1" id="el_zU76su1rC7"/>
        </g>
        <g id="el_FXAh3u4dMAo">
          <g id="el_NmY9myGQOB6">
            <path d="M4.2,79.2C1.9,79.2,0,77.3,0,75s1.9-4.2,4.2-4.2c2.3,0,4.2,1.9,4.2,4.2S6.5,79.2,4.2,79.2z" id="el_7DHFC1d-8yl"/>
          </g>
        </g>
      </g></g>
      <g id="line3" data-animator-group="true" data-animator-type="0"><g id="el_0V8JB2QZfOP">
        <g id="el_7oxvZDl1dmy">
          <rect x="75" y="74.5" width="70.9" height="1" id="el_0TQLy4rZAFa"/>
        </g>
        <g id="el_HuHGCwZw6Of">
          <g id="el_iIMUaKNYCsb">
            <path d="M145.6,70.6c2.4,0,4.4,2,4.4,4.4s-2,4.4-4.4,4.4c-2.4,0-4.4-2-4.4-4.4S143.2,70.6,145.6,70.6z" id="el_hbA3uN6yGXX"/>
          </g>
        </g>
      </g></g>
      <g id="line8" data-animator-group="true" data-animator-type="0"><g id="el_CmgDfQ56DtQ">
        <g id="el_rUHEjOXGss9">
          <rect x="25" y="24.5" width="1" height="2" id="el_1zmj7J0CXbF"/>
        </g>
        <g id="el_Gqs3RjSg4wH">
          <path d="M71.1,71.8l-2.9-2.9l0.7-0.7l2.9,2.9L71.1,71.8z M66.1,66.8l-2.9-2.9l0.7-0.7l2.9,2.9L66.1,66.8z M61,61.7&#xA;&#9;&#9;&#9;l-2.9-2.9l0.7-0.7l2.9,2.9L61,61.7z M56,56.7l-2.9-2.9l0.7-0.7l2.9,2.9L56,56.7z M51,51.7l-2.9-2.9l0.7-0.7l2.9,2.9L51,51.7z&#xA;&#9;&#9;&#9; M46,46.7l-2.9-2.9l0.7-0.7l2.9,2.9L46,46.7z M40.9,41.6l-2.9-2.9l0.7-0.7l2.9,2.9L40.9,41.6z M35.9,36.6L33,33.7l0.7-0.7l2.9,2.9&#xA;&#9;&#9;&#9;L35.9,36.6z M30.9,31.6L28,28.7l0.7-0.7l2.9,2.9L30.9,31.6z" id="el_28gxd77diFP"/>
        </g>
        <g id="el_YLsayteThkl">
          <rect x="73.8" y="73.3" width="1" height="2" id="el_DCIQTZUjvbj"/>
        </g>
        <g id="el_EILSR98Kl4A">
          <g id="el_4-xKYhrtMfK">
            <path d="M22,27.9c-1.6-1.6-1.6-4.3,0-6s4.3-1.6,6,0c1.6,1.6,1.6,4.3,0,6C26.3,29.6,23.6,29.6,22,27.9z" id="el_bFcigZ5U8nt"/>
          </g>
        </g>
      </g></g>
      <g id="line4" data-animator-group="true" data-animator-type="0"><g id="el_GJi35WdMtZq">
        <g id="el_L12R8i-xTfz">
          
            <rect x="123.9" y="123.4" width="1" height="2" id="el_w-4mRssGAdt"/>
        </g>
        <g id="el_rE55Ne9Kxa0">
          <path d="M121.2,121.9l-2.9-2.9l0.7-0.7l2.9,2.9L121.2,121.9z M116.2,116.9l-2.9-2.9l0.7-0.7l2.9,2.9L116.2,116.9z&#xA;&#9;&#9;&#9; M111.2,111.9l-2.9-2.9l0.7-0.7l2.9,2.9L111.2,111.9z M106.1,106.9l-2.9-2.9l0.7-0.7l2.9,2.9L106.1,106.9z M101.1,101.8L98.3,99&#xA;&#9;&#9;&#9;l0.7-0.7l2.9,2.9L101.1,101.8z M96.1,96.8L93.2,94l0.7-0.7l2.9,2.9L96.1,96.8z M91.1,91.8L88.2,89l0.7-0.7l2.9,2.9L91.1,91.8z&#xA;&#9;&#9;&#9; M86.1,86.8l-2.9-2.9l0.7-0.7l2.9,2.9L86.1,86.8z M81.1,81.8l-2.9-2.9l0.7-0.7l2.9,2.9L81.1,81.8z" id="el_FSUT4oUoPWw"/>
        </g>
        <g id="el_TIPlgTnLGRx">
          <rect x="75.2" y="74.7" width="1" height="2" id="el_FUdCGwmldWw"/>
        </g>
        <g id="el_19Vj2CV9cUe">
          <g id="el_u5TvkLj7qw4">
            <path d="M128,121.9c1.7,1.7,1.7,4.5,0,6.2c-1.7,1.7-4.5,1.7-6.2,0c-1.7-1.7-1.7-4.5,0-6.2&#xA;&#9;&#9;&#9;&#9;C123.6,120.2,126.3,120.2,128,121.9z" id="el_pAU8zCVpjzd"/>
          </g>
        </g>
      </g></g>
      <g id="line6" data-animator-group="true" data-animator-type="0"><g id="el_YCjjBNPLmMe">
        <g id="el_b9ZkbWOJk2K">
          <rect x="24.5" y="124" width="2" height="1" id="el_ov2W8FYkaoZ"/>
        </g>
        <g id="el_M62Zruius9N">
          <path d="M28.7,122l-0.7-0.7l2.9-2.9l0.7,0.7L28.7,122z M33.7,117l-0.7-0.7l2.9-2.9l0.7,0.7L33.7,117z M38.8,111.9&#xA;&#9;&#9;&#9;l-0.7-0.7l2.9-2.9l0.7,0.7L38.8,111.9z M43.8,106.9l-0.7-0.7l2.9-2.9l0.7,0.7L43.8,106.9z M48.8,101.9l-0.7-0.7l2.9-2.9l0.7,0.7&#xA;&#9;&#9;&#9;L48.8,101.9z M53.8,96.9l-0.7-0.7l2.9-2.9l0.7,0.7L53.8,96.9z M58.9,91.8l-0.7-0.7l2.9-2.9l0.7,0.7L58.9,91.8z M63.9,86.8&#xA;&#9;&#9;&#9;l-0.7-0.7l2.9-2.9l0.7,0.7L63.9,86.8z M68.9,81.8l-0.7-0.7l2.9-2.9l0.7,0.7L68.9,81.8z" id="el_pN8jo68f4rw"/>
        </g>
        <g id="el_Xw2f0ul4TTu">
          <rect x="73.3" y="75.2" width="2" height="1" id="el_3jMEQqFnTKm"/>
        </g>
        <g id="el_kc-eqFI9iw_">
          <g id="el_r5GKdjZV5iA">
            <path d="M27.9,128c-1.6,1.6-4.3,1.6-6,0c-1.6-1.6-1.6-4.3,0-6c1.6-1.6,4.3-1.6,6,0C29.6,123.7,29.6,126.4,27.9,128z" id="el_mB8CQsX1ZXf"/>
          </g>
        </g>
      </g></g>
      <g id="line2" data-animator-group="true" data-animator-type="0"><g id="el_7x5zmgwj_2g">
        <g id="el_eiiOts8bo_r">
          <rect x="123.4" y="25.1" width="2" height="1" id="el_CzsYCmcxmp8"/>
        </g>
        <g id="el_wH3icC6PCAs">
          <path d="M78.9,71.8l-0.7-0.7l2.9-2.9l0.7,0.7L78.9,71.8z M83.9,66.8l-0.7-0.7l2.9-2.9l0.7,0.7L83.9,66.8z M89,61.8&#xA;&#9;&#9;&#9;L88.2,61l2.9-2.9l0.7,0.7L89,61.8z M94,56.8L93.2,56l2.9-2.9l0.7,0.7L94,56.8z M99,51.7L98.3,51l2.9-2.9l0.7,0.7L99,51.7z&#xA;&#9;&#9;&#9; M104,46.7l-0.7-0.7l2.9-2.9l0.7,0.7L104,46.7z M109,41.7l-0.7-0.7l2.9-2.9l0.7,0.7L109,41.7z M114,36.7l-0.7-0.7l2.9-2.9l0.7,0.7&#xA;&#9;&#9;&#9;L114,36.7z M119,31.7l-0.7-0.7l2.9-2.9l0.7,0.7L119,31.7z" id="el_vDXE1ywI1Ng"/>
        </g>
        <g id="el_Yofzr2JlkxZ">
          <rect x="74.7" y="73.8" width="2" height="1" id="el_3oyaiVNAY7y"/>
        </g>
        <g id="el_ipsfbUgdj-1">
          <g id="el_cm9-iyCYoUr">
            <path d="M121.9,22c1.7-1.7,4.5-1.7,6.2,0s1.7,4.5,0,6.2c-1.7,1.7-4.5,1.7-6.2,0C120.2,26.4,120.2,23.7,121.9,22z" id="el_j6siMw4IzOB"/>
          </g>
        </g>
      </g></g>
      </svg>
    </div>
  )
}
