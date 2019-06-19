/**
 * Uses Puppeteer and the browser's online/offline events to monitor internet
 * connection status.
 */

const util = require('util');
const dns = require('dns');
const puppeteer = require('puppeteer');

export async function isConnected() {
  try {
    const lookupService = util.promisify(dns.lookupService);
    const result = await lookupService('8.8.8.8', 53);
    console.log(result);
    return true;
  } catch (err) {
    return false;
  }
}
