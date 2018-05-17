const themifyOptions = {
  palette : {
    light: {
      'primary-100': '#f2f2f4',
      'primary-200': '#cccece',
      'accent-100': '#e6f9fc',
      'accent-200': '#96e1ed',
    },
    dark: {
      'primary-100': '#505050',
      'primary-200': '#666a6b',
      'accent-100': '#096796',
      'accent-200': '#0a87c6',
    },
  },
  screwIE11 : false,
  fallback : {
    cssPath : './dist/bolt-theme-fallback.css', // use checksum
    dynamicPath: './dist/bolt-theme-fallback.json',
  },
};