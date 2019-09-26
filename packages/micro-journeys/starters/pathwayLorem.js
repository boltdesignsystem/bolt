import stepOneCharacterLorem from './steo-one-character-lorem.html';
import stepTwoCharacterLorem from './steo-two-character-lorem.html';

const pathwayLoerm = `
<bolt-interactive-pathway pathway-title="New Title">
  ${stepTwoCharacterLorem}
  ${stepOneCharacterLorem}
  ${stepTwoCharacterLorem}
</bolt-interactive-pathway>
`;

export default pathwayLoerm;
