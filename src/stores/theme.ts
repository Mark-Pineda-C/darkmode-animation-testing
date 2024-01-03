import { map } from "nanostores";

interface ThemeProps {
  theme?: string;
  image1?: any;
  image2?: any;
  ref?: any;
  active?: boolean;
  circle?: {
    x: number;
    y: number;
  };
}

export const themeCtx = map<ThemeProps>({
  active: false,
  circle: {
    x: 0,
    y: 0,
  },
} as ThemeProps);
