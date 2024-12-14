export const theme = {
  colors: {
    primary: '#FFD700',
    background: {
      primary: '#FFFFFF',
      secondary: '#F8F8F8',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#757575',
    },
    border: {
      default: '#E0E0E0',
    },
    success: '#4CAF50',
    error: '#F44336',
    disabled: '#D1D1D6',
    icon: '#1A1A1A',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xs: 4,
  },
  typography: {
    header: {
      fontSize: 28,
      fontWeight: '700',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
    },
  },
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
  },
};

export type Theme = typeof theme;
