module.exports = [
  {
    cleanupAttrs: true,
  },
  {
    removeDoctype: true,
  },
  {
    removeXMLProcInst: true,
  },
  {
    removeComments: true,
  },
  {
    removeMetadata: true,
  },
  {
    removeTitle: true,
  },
  {
    removeDesc: true,
  },
  {
    removeUselessDefs: true,
  },
  {
    removeEditorsNSData: true,
  },
  {
    removeEmptyAttrs: true,
  },
  {
    removeHiddenElems: true,
  },
  {
    removeEmptyText: true,
  },
  {
    removeEmptyContainers: true,
  },
  {
    removeViewBox: false,
  },
  {
    cleanupEnableBackground: true,
  },
  {
    convertStyleToAttrs: true,
  },
  {
    convertColors: true,
  },
  {
    convertPathData: {
      applyTransforms: true,
      applyTransformsStroked: true,
      makeArcs: {
        threshold: 2.5, // coefficient of rounding error
        tolerance: 0.5, // percentage of radius
      },
      straightCurves: true,
      lineShorthands: true,
      curveSmoothShorthands: true,
      floatPrecision: 1,
      transformPrecision: 1,
      removeUseless: true,
      collapseRepeated: true,
      utilizeAbsolute: true,
      leadingZero: true,
      negativeExtraSpace: true,
      noSpaceAfterFlags: true,
      forceAbsolutePath: false,
    },
  },
  {
    convertTransform: {
      convertToShorts: true,
      floatPrecision: 1,
      transformPrecision: 1,
      matrixToTransform: true,
      shortTranslate: true,
      shortScale: true,
      shortRotate: true,
      removeUseless: true,
      collapseIntoOne: true,
      leadingZero: true,
      negativeExtraSpace: false,
    },
  },
  {
    removeUnknownsAndDefaults: true,
  },
  {
    removeNonInheritableGroupAttrs: true,
  },
  {
    removeUselessStrokeAndFill: true,
  },
  {
    removeUnusedNS: true,
  },
  {
    cleanupIDs: true,
  },
  {
    cleanupNumericValues: {
      floatPrecision: 1,
      leadingZero: true,
      defaultPx: true,
      convertToPx: true,
    },
  },
  {
    moveElemsAttrsToGroup: true,
  },
  {
    moveGroupAttrsToElems: true,
  },
  {
    removeRasterImages: false,
  },
  {
    mergePaths: {
      collapseRepeated: true,
      force: true,
      leadingZero: true,
      negativeExtraSpace: true,
      noSpaceAfterFlags: true,
    },
  },
  {
    convertShapeToPath: true,
  },
  {
    sortAttrs: true,
  },
  {
    removeDimensions: true,
  },
];
