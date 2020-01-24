import stepOneCharacterLorem from './step-one-character-lorem.html';
import stepTwoCharacterLorem from './step-two-character-lorem.html';

const pathwayLorem = `
<bolt-interactive-pathway pathway-title="New Title">
  ${stepTwoCharacterLorem}
  ${stepOneCharacterLorem}
  ${stepTwoCharacterLorem}
</bolt-interactive-pathway>
`;

export default pathwayLorem;
