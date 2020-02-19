const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

import '@testing-library/jest-dom/extend-expect';
