import {TestUtils} from "./test.util";

const options = {
  palette: TestUtils.unmatchPalette
};
const plugins = [TestUtils.plugin.sass(), TestUtils.plugin.themify(options)];
TestUtils.run('Themify - Valid CSS with Unmatch Palette', '__tests__/unmatch-palette/*.input.spec.scss', plugins);