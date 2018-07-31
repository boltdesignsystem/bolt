module.exports = async (page, scenario, vp) => {
  await page.setRequestInterception(true);
  page.on('request', interceptRequest);
};

// Block scripts that can cause problems or do analytics tracking.
const banned = /(www\.googletagmanager\.com|script\.crazyegg\.com|google-analytics\.com|js-agent\.newrelic\.com|translate\.google\.com)/;
async function interceptRequest(request) {
  if (banned.test(request.url())) {
    request.abort();
  } else {
    request.continue();
  }
}
