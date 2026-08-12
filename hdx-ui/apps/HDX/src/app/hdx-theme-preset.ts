import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/**
 * Reskins the PrimeNG Aura preset with the IUDX brand navy ramp
 * (matches --canvas-primary-* in styles/canvas-variables.scss) so
 * PrimeNG widgets (p-select, p-button, p-tag …) match the rest of
 * the app instead of Aura's default blue.
 */
export const HdxThemePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eef1f8',
      100: '#e8ecf6',
      200: '#d4daf0',
      300: '#c5cce8',
      400: '#b0b9dc',
      500: '#283a89',
      600: '#253575',
      700: '#1e2d6b',
      800: '#1a2659',
      900: '#151f4a',
      950: '#10173a',
    },
  },
});
