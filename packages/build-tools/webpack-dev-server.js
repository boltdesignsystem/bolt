// export the most commonly used webpack-dev-server packages so external scripts spinning up webpack share deps

const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const express = require('express');

module.exports = {
  devMiddleware,
  webpack,
  express,
};
