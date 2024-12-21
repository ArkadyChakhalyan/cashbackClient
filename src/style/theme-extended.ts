import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        green: Palette['primary'];
        blue: Palette['primary'];
        red: Palette['primary'];
        yellow: Palette['primary'];
        purple: Palette['primary'];
        orange: Palette['primary'];
        pink: Palette['primary'];
        brown: Palette['primary'];
        darkBackground: Palette['primary'];
    }

    interface PaletteOptions {
        green?: PaletteOptions['primary'];
        blue?: PaletteOptions['primary'];
        red?: PaletteOptions['primary'];
        yellow?: PaletteOptions['primary'];
        purple?: PaletteOptions['primary'];
        orange?: PaletteOptions['primary'];
        pink?: PaletteOptions['primary'];
        brown?: PaletteOptions['primary'];
        darkBackground?: PaletteOptions['primary'];
    }
}
