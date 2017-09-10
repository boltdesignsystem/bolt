import { customElement, GenericTypes } from '@bolt/ui-core';
import RawBand, { Attrs, Events, BandProps } from './Band';

const Band = customElement( 'bolt-band' )( RawBand ) as typeof RawBand;

export {
  Band
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'bolt-band': GenericTypes.IntrinsicCustomElement<BandProps>
      & GenericTypes.IntrinsicBoreElement<Attrs, Events>
    }
  }
}
