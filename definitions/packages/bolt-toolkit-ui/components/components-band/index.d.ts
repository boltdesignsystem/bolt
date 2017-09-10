import { GenericTypes } from '@bolt/ui-core';
import RawBand, { Attrs, Events, BandProps } from './Band';
declare const Band: typeof RawBand;
export { Band };
declare global  {
    namespace JSX {
        interface IntrinsicElements {
            'bolt-band': GenericTypes.IntrinsicCustomElement<BandProps> & GenericTypes.IntrinsicBoreElement<Attrs, Events>;
        }
    }
}
