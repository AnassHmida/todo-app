export const theme = {
  colors: {
    primary: '#6366F1',
    secondary: '#A855F7',
    success: '#22C55E',
    warning: '#FF9500',
    error: '#EF4444',
    background: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      tertiary: '#F3F4F6',
    },
    text: {
      primary: '#111827',
      secondary: '#374151',
      tertiary: '#6B7280',
      inverse: '#FFFFFF',
    },
    border: {
      light: '#E5E7EB',
      dark: '#D1D5DB',
    },
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 12,
    lg: 16,
    full: 9999,
  },
  typography: {
    h1: {
      fontSize: 34,
      lineHeight: 41,
      fontWeight: '700',
    },
    h2: {
      fontSize: 28,
      lineHeight: 34,
      fontWeight: '700',
    },
    body: {
      fontSize: 17,
      lineHeight: 22,
      fontWeight: '400',
    },
    caption: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '400',
    },
  },
  animation: {
    scale: {
      pressed: 0.96,
      normal: 1,
    },
    duration: {
      fast: 150,
      normal: 250,
      slow: 350,
    },
  },
};
