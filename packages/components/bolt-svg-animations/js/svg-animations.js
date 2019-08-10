const outline = document.getElementById('bolt-self-drawing-circle-outline');

/**
 * Creates a self-drawing circle
 *
 * @param {int} dashSize - size of dashes/spaces 
 * @param {int} rate - speed at which the circle draws itself
 *
 * @return {void}
 */

async function drawCircle (dashSize = 4, speed = 20) {
  
  const threshold = Math.ceil(245 / dashSize);
  
  for (var i = 0; i <= threshold; i++) {
    outline.setAttribute('stroke-dasharray', `${dashSize} ${dashSize} ${outline.getAttribute('stroke-dasharray')}`);
		
		await drawTimer(speed);
    
    if(i === threshold) {
      document.getElementById('bolt-self-drawing-circle-container').classList.add('rotate')
    }
  }
}

/**
 * Delay between each dash of circle being drawn
 *
 * @param {int} ms - delay between each dash appearing
 *
 * @return {promise}
 */

function drawTimer(ms) {
	return new Promise(res => setTimeout(res, ms));
 }

//Create circle;  TODO: temporarily hardcoded
drawCircle(10, 20);