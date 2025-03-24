import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    customConstants: typeof customConstants;
  }
  interface ThemeOptions {
    customConstants?: typeof customConstants;
  }
  interface Palette {
    navbar: {
      main: string;
      contrastText: string;
    };
    buttons: {
      main: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    navbar?: {
      main?: string;
      contrastText?: string;
    };
    buttons?: {
      main?: string;
      contrastText?: string;
    };
  }
}

const customConstants = {
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  colors: {
    navbar: "#4a36a1",
    buttons: "#9a8cd5",
    background: "#FFF",
  },
};

const theme = createTheme({
  palette: {
    navbar: {
      main: customConstants.colors.navbar,
    },
    buttons: {
      main: customConstants.colors.buttons,
    },
    background: {
      default: customConstants.colors.background,
    },
  },
  spacing: (factor: number) => `${customConstants.spacing.small * factor}px`,
  customConstants,
});

export default theme;
