import { Component } from 'skatejs';
import { Colored, Disabled } from './mixins';

export const ColoredDisabledComponent = Colored( Disabled( Component ) );
