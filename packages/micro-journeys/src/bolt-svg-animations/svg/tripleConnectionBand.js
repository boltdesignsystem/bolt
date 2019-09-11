import { html } from '@bolt/core/renderers/renderer-lit-html';
import { svg } from 'lit-html';

export const tripleConnectionBand = ({ speed, direction, theme }) => {
  return svg`
	<svg version="1.1" width="100%" id="bolt-triple-connection-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 348 126" style="enable-background:new 0 0 348 126;" xml:space="preserve">
	
	<style>

	#bolt-triple-connection-svg { transform: ${
    direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)'
  };}
	
	@keyframes background_highlight {
		0% {
			fill-opacity: 1;
		}

		30% {
			fill-opacity: 1;
		}

		33% {
			fill-opacity: 0;
		}

		90% {
			fill-opacity: 0;
		}

		100% {
			fill-opacity: 1;
		}
	}

	@keyframes kf_connectionArrows3 {
			0% {
					transform: translate(168.10000610351562px, 92.69999694824219px) rotate(4deg) translate(-168.10000610351562px, -92.69999694824219px);
			}
			66.67% {
					transform: translate(168.10000610351562px, 92.69999694824219px) rotate(4deg) translate(-168.10000610351562px, -92.69999694824219px);
			}
			83.33% {
					transform: translate(168.10000610351562px, 92.69999694824219px) rotate(2deg) translate(-168.10000610351562px, -92.69999694824219px);
			}
			100% {
					transform: translate(168.10000610351562px, 92.69999694824219px) rotate(-14deg) translate(-168.10000610351562px, -92.69999694824219px);
			}
	}


	@keyframes kf_connectionArrows3Container {
			0% {
					transform: translate(168.10000610351562px, 92.69999694824219px) translate(-168.10000610351562px, -92.69999694824219px) translate(-202px, -15px);
			}
			66.67% {
					transform: translate(168.10000610351562px, 92.69999694824219px) translate(-168.10000610351562px, -92.69999694824219px) translate(-202px, -12px);
			}
			83.33% {
					transform: translate(168.10000610351562px, 92.69999694824219px) translate(-168.10000610351562px, -92.69999694824219px) translate(0px, 0px);
			}
			100% {
					transform: translate(168.10000610351562px, 92.69999694824219px) translate(-168.10000610351562px, -92.69999694824219px) translate(144px, -5px);
			}
	}

	@keyframes kf_connectionArrows2Container {
			0% {
					transform: translate(126.5999984741211px, 46.5px) translate(-126.5999984741211px, -46.5px) translate(-164px, 0px);
			}
			33.33% {
					transform: translate(126.5999984741211px, 46.5px) translate(-126.5999984741211px, -46.5px) translate(-164px, 0px);
			}
			66.67% {
					transform: translate(126.5999984741211px, 46.5px) translate(-126.5999984741211px, -46.5px) translate(196px, 0px);
			}
			100% {
					transform: translate(126.5999984741211px, 46.5px) translate(-126.5999984741211px, -46.5px) translate(196px, 0px);
			}
	}


	@keyframes kf_connectionArrows1 {
			0% {
					transform: translate(219.90000915527344px, 1.5px) rotate(-9deg) translate(-219.90000915527344px, -1.5px);
			}
			16.67% {
					transform: translate(219.90000915527344px, 1.5px) rotate(-2deg) translate(-219.90000915527344px, -1.5px);
			}
			33.33% {
					transform: translate(219.90000915527344px, 1.5px) rotate(9deg) translate(-219.90000915527344px, -1.5px);
			}
			100% {
					transform: translate(219.90000915527344px, 1.5px) rotate(9deg) translate(-219.90000915527344px, -1.5px);
			}
	}


	@keyframes kf_el_connectionArrows1Container {
			0% {
					transform: translate(219.90000915527344px, 1.5px) translate(-219.90000915527344px, -1.5px) translate(-256px, 16px);
			}
			16.67% {
					transform: translate(219.90000915527344px, 1.5px) translate(-219.90000915527344px, -1.5px) translate(-73px,  -2px);
			}
			33.33% {
					transform: translate(219.90000915527344px, 1.5px) translate(-219.90000915527344px, -1.5px) translate(100px, 7px);
			}
			100% {
					transform: translate(219.90000915527344px, 1.5px) translate(-219.90000915527344px, -1.5px) translate(100px, 7px);
			}
	}

	#bolt-triple-connection-svg * {
	
		animation-duration: 3s;
		animation-iteration-count: infinite;
		animation-timing-function: cubic-bezier(0, 0, 1, 1);
	}

	#connectionStripe1,
	#connectionStripe2,
	#connectionStripe3 {
		fill: url(#band_x5F_1_1_);
		fill-opacity: 0;
	}

	#connectionStripe1Under,
	#connectionStripe2Under,
	#connectionStripe3Under {
		fill: url(#band_x5F_2_1_);
	}

	#el_TVv650n3zr {
			opacity: 0.2;
			enable-background: new;
	}

	#el_mNNv3syQP0 {
			opacity: 0.5;
			enable-background: new;
	}


	#el_Q3h0ApZc4I {
			opacity: 0.2;
			enable-background: new;
	}

	#el_CSeCRpWXAn {
			opacity: 0.5; 
			enable-background: new;
	}

	#el_jXTRwSRTHD,
	#el_70ksXSP-Vt,
	#el_I62Er4NRpE  {   
			fill: #FFFFFF;
	}

	#el_7S1IQpp32N {
			opacity: 0.2; 
			enable-background: new;
	}

	#el_BGTV_SIFCz {
			opacity: 0.5;
			enable-background: new;
	}


	#el_connectionArrows1Container {
			animation-fill-mode: backwards;
			transform: translate(219.90000915527344px, 1.5px) translate(-219.90000915527344px, -1.5px) translate(-256px, 16px);
			animation-name: kf_el_connectionArrows1Container;
			animation-timing-function: cubic-bezier(0, 0, 1, 1);
	}

	#connectionArrows1 {
			animation-fill-mode: backwards;
			transform: translate(219.90000915527344px, 1.5px) rotate(-7deg) translate(-219.90000915527344px, -1.5px);
			animation-name: kf_connectionArrows1;
			animation-timing-function: cubic-bezier(0, 0, 1, 1);
	}

	#connectionArrows2Container {
			animation-fill-mode: backwards;
			transform: translate(126.5999984741211px, 46.5px) translate(-126.5999984741211px, -46.5px) translate(-164px, 0px);
			animation-name: kf_connectionArrows2Container;
			animation-timing-function: cubic-bezier(0, 0, 1, 1);
	}

	#connectionArrows3Container {
			animation-fill-mode: backwards;
			transform: translate(168.10000610351562px, 92.69999694824219px) translate(-168.10000610351562px, -92.69999694824219px) translate(-202px, -15px);
			animation-name: kf_connectionArrows3Container;
			animation-timing-function: cubic-bezier(0, 0, 1, 1);
	}

	#connectionArrows3 {
			animation-fill-mode: backwards;
			transform: translate(168.10000610351562px, 92.69999694824219px) rotate(4deg) translate(-168.10000610351562px, -92.69999694824219px);
			animation-name: kf_connectionArrows3;
			animation-timing-function: cubic-bezier(0, 0, 1, 1);
	}

	#connectionStripe1 {
		animation: background_highlight 3s linear 0s infinite;
	}

	#connectionStripe2 {
		animation: background_highlight 3s linear 1s infinite;
	}

	#connectionStripe3 {
		animation: background_highlight 3s linear 2s infinite;
	}
</style>

<linearGradient id="band_x5F_1_1_" gradientUnits="userSpaceOnUse" x1="-125.1076" y1="358.1188" x2="-124.1355" y2="358.1188" gradientTransform="matrix(347.025 0 0 -43.8672 43426.1367 15731.6602)">
	<stop offset="0" style="stop-color:#7ACCCC"/>
	<stop offset="1" style="stop-color:#7ACCCC;stop-opacity:0"/>
</linearGradient>
<path id="connectionStripe1Under" d="M348,44C234.9,29.6,113.1,29.6,0,44V22.8c113.1-30.5,234.9-30.5,348,0V44z"/>
<path id="connectionStripe1" d="M348,44C234.9,29.6,113.1,29.6,0,44V22.8c113.1-30.5,234.9-30.5,348,0V44z"/>
<g id="el_connectionArrows1Container" data-animator-group="true" data-animator-type="0"><g id="connectionArrows1" data-animator-group="true" data-animator-type="1"><g id="el_KxVIkpxR1A">
	<path id="el_TVv650n3zr" fill="#FFFFFF" d="M223.8,1.8c-1.3-0.1-2.6-0.2-3.9-0.3c2.9,5.6,5.8,11.1,8.7,16.6c-2.9,5.2-5.8,10.4-8.7,15.7&#xA;&#9;&#9;c1.3,0,2.6,0.1,3.9,0.1c2.9-5.3,5.8-10.5,8.7-15.6C229.7,13,226.8,7.4,223.8,1.8"/>
	<path id="el_mNNv3syQP0" fill="#FFFFFF" d="M234.5,2.7c-1.3-0.1-2.6-0.2-3.9-0.3c2.9,5.6,5.8,11.1,8.7,16.5c-2.9,5-5.8,10.2-8.7,15.4&#xA;&#9;&#9;c1.3,0.1,2.6,0.1,3.9,0.2c2.9-5.2,5.8-10.3,8.7-15.3C240.3,13.7,237.4,8.2,234.5,2.7"/>
	<path id="el_I62Er4NRpE" fill="#FFFFFF" d="M245.1,3.7c-1.3-0.1-2.6-0.3-3.9-0.4c2.9,5.5,5.8,11,8.7,16.4c-2.9,4.9-5.8,9.9-8.7,15&#xA;&#9;&#9;c1.3,0.1,2.6,0.1,3.9,0.2c2.9-5.1,5.8-10,8.7-14.9C250.9,14.7,248,9.2,245.1,3.7"/>
</g></g></g>
<linearGradient id="band_x5F_2_1_" gradientUnits="userSpaceOnUse" x1="-124.1355" y1="356.3593" x2="-125.1384" y2="356.3593" gradientTransform="matrix(347.025 0 0 -33.0724 43426.1367 11848.6641)">
	<stop offset="0" style="stop-color:#FFCC4C;stop-opacity:0"/>
	<stop offset="1" style="stop-color:#535DA6"/>
</linearGradient>
<path id="connectionStripe2Under" d="M348,73.6c-113.1,8-234.9,8-348,0V52.4c113.1-8,234.9-8,348,0V73.6z"/>
<path id="connectionStripe2" d="M348,73.6c-113.1,8-234.9,8-348,0V52.4c113.1-8,234.9-8,348,0V73.6z"/>
<g id="connectionArrows2Container" data-animator-group="true" data-animator-type="0"><g id="connectionArrows2">
	<path id="el_Q3h0ApZc4I" fill="#FFFFFF" d="M130.5,46.8c-1.3,0-2.6,0-3.9,0.1c2.9,5.3,5.8,10.7,8.7,16.1c-2.9,5.4-5.8,10.8-8.7,16.1&#xA;&#9;&#9;c1.3,0,2.6,0,3.9,0.1c2.9-5.4,5.8-10.8,8.7-16.2C136.3,57.6,133.4,52.1,130.5,46.8"/>
	<path id="el_CSeCRpWXAn" fill="#FFFFFF" d="M141.2,46.6c-1.3,0-2.6,0-3.9,0.1c2.9,5.4,5.8,10.8,8.7,16.3c-2.9,5.5-5.8,10.9-8.7,16.3&#xA;&#9;&#9;c1.3,0,2.6,0,3.9,0.1c2.9-5.4,5.8-10.9,8.7-16.4C147,57.5,144.1,52,141.2,46.6"/>
	<path id="el_jXTRwSRTHD" fill="#FFFFFF" d="M151.8,46.5c-1.3,0-2.6,0-4,0c2.9,5.5,5.8,10.9,8.7,16.4c-2.9,5.5-5.8,11-8.7,16.4&#xA;&#9;&#9;c1.3,0,2.6,0,4,0c2.9-5.5,5.8-11,8.7-16.5C157.6,57.5,154.7,52,151.8,46.5"/>
</g></g>
<linearGradient id="band_x5F_3_1_" gradientUnits="userSpaceOnUse" x1="-124.1355" y1="358.114" x2="-125.1384" y2="358.114" gradientTransform="matrix(347.025 0 0 -43.8672 43426.1367 15813.4707)">
	<stop offset="0" style="stop-color:#FFCC4C;stop-opacity:0"/>
	<stop offset="1" style="stop-color:#535DA6"/>
</linearGradient>
<path id="connectionStripe3Under" d="M348,103.2c-113.1,30.5-234.9,30.5-348,0V82c113.1,14.4,234.9,14.4,348,0V103.2z"/>
<path id="connectionStripe3" d="M348,103.2c-113.1,30.5-234.9,30.5-348,0V82c113.1,14.4,234.9,14.4,348,0V103.2z"/>
<g id="connectionArrows3Container" data-animator-group="true" data-animator-type="0"><g id="connectionArrows3" data-animator-group="true" data-animator-type="1"><g id="el_6ocLR71www">
	<path id="el_7S1IQpp32N" fill="#FFFFFF" d="M172.1,92.8c-1.3,0-2.6,0-4,0c2.9,5.5,5.8,11.1,8.7,16.6c-2.9,5.5-5.8,11.1-8.7,16.6&#xA;&#9;&#9;c1.3,0,2.6,0,4,0c2.9-5.5,5.8-11.1,8.7-16.6C177.9,103.9,175,98.4,172.1,92.8"/>
	<path id="el_BGTV_SIFCz" fill="#FFFFFF" d="M182.8,92.8c-1.3,0-2.6,0-4,0c2.9,5.5,5.8,11,8.7,16.5c-2.9,5.6-5.8,11.1-8.7,16.7c1.3,0,2.6,0,4,0&#xA;&#9;&#9;c2.9-5.6,5.8-11.1,8.7-16.7C188.6,103.8,185.7,98.3,182.8,92.8"/>
	<path id="el_70ksXSP-Vt" fill="#FFFFFF" d="M193.4,92.7c-1.3,0-2.6,0-4,0c2.9,5.5,5.8,10.9,8.7,16.3c-2.9,5.6-5.8,11.1-8.7,16.7&#xA;&#9;&#9;c1.3,0,2.6-0.1,4-0.1c2.9-5.6,5.8-11.2,8.7-16.7C199.3,103.6,196.3,98.2,193.4,92.7"/>
</g></g></g>
</svg>`;
};
