import { h, Component } from 'preact';

export default class Icon extends Component {
  render() {
    const {
      className,
      glyph,
      bgColor,
      fgColor,
      size,
      ...restProps
    } = this.props;

    return (
      <svg className={className} width={size} height={size} {...restProps}>
        <use xlinkHref={`#${glyph}`} />
      </svg>
    );
  }
}

Icon.defaultProps = {
  glyph: '',
  className: 'icon',
};
