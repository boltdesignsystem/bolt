import {TestUtils} from "./test.util";

const options = {
  palette: TestUtils.defaultPalette
};
const plugins = [TestUtils.plugin.sass(), TestUtils.plugin.themify(options)];
TestUtils.run('Themify - Valid CSS', '__tests__/valid-css/*.input.spec.scss', plugins);