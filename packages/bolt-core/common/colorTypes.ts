export const ColorTypes = {
  brand: 'brand',
  info: 'info',
  warning: 'warning',
  success: 'success',
  error: 'error'
};

export type ColorType = keyof typeof ColorTypes;

export function cssClassForColorType( prefix: string, color: ColorType, singleDash = false ): string | null {
  return color
    ? `${prefix}-${singleDash ? '' : '-'}${color}`
    : null;
}
