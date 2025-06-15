import { alpha, createTheme } from '@mui/material';

export const theme = createTheme({
    components: {
        MuiTooltip: {
            defaultProps: {
                disableFocusListener: true,
                disableInteractive: true,
                enterDelay: 400,
                enterNextDelay: 400,
            },
            styleOverrides: {
                tooltip: {
                    padding: '12px 16px',
                    borderRadius: 32,
                    background: '#262130',
                    fontWeight: 400,
                    boxShadow: '2px 2px 6px 2px rgba(0, 0, 0, 0.2)'
                }
            },
        },
        MuiSwipeableDrawer: {
            defaultProps: {
                disableDiscovery: true,
                anchor: 'bottom',
                slotProps: {
                    backdrop: {
                        sx: { backdropFilter: 'blur(2px)', background: 'rgba(0, 0, 0, 0.3)' }
                    }
                },
                sx: {
                    '.MuiPaper-root': {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        margin: 'auto',
                    }
                }
            },
        },
        //@ts-ignore
        MuiLoadingButton: {
            defaultProps: {
                variant: 'contained',
                size: 'large',
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    maxWidth: 640,
                    '&:focus-visible': {
                        outline: 'none',
                    },
                }
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    '.MuiToggleButtonGroup-middleButton, .MuiToggleButtonGroup-lastButton': {
                        marginLeft: 0,
                    },
                    '.MuiButtonBase-root:not(.Mui-selected)': {
                        '&:hover,&:focus': {
                            background: '#3a324875',
                        },
                    },
                },
            },
        },
        MuiToggleButton: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
                disableFocusRipple: true,
            },
            styleOverrides: {
                root: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '24px',
                    height: '32px',
                    padding: '12px 16px',
                    border: 'none',
                    fontSize: '0.8125rem',
                    textTransform: 'none',
                    background: '#262130',
                    transition: 'background 0.25s ease-in-out, color 0.25s ease-in-out',
                    flexGrow: 1,
                    '&:hover, &:focus': {
                        background: '#3a3248',
                        color: '#ffffff',
                    },
                    '&.Mui-selected': {
                        background: '#3a3248',
                        '&:hover, &:focus': {
                            background: '#3a3248',
                        },
                    }
                },
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    background: 'rgba(255, 255, 255, 0.15)',
                    fontWeight: 300,
                    '&:hover,&:focus-visible': {
                        background: 'rgba(255, 255, 255, 0.25)',
                    },
                    '.MuiTouchRipple-root': {
                        display: 'none',
                    },
                    '&:active, &:focus-visible': {
                        scale: 0.95,
                    },
                    '&.Mui-focusVisible': {
                        background: 'rgba(255, 255, 255, 0.25)',
                    },
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
                disableFocusRipple: true,
                variant: 'contained',
                size: 'large',
            },
            styleOverrides: {
                root: {
                    fontWeight: 400,
                    color: '#ffffff',
                    textTransform: 'unset',
                    borderRadius: 32,
                    transition: 'background 0.25s ease-in-out, color 0.25s ease-in-out',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(6px)',

                    '&:hover, &:focus-visible, &:active': {
                        background: 'rgba(255, 255, 255, 0.15)',
                    }
                },
                sizeLarge: {
                    height: 48,
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                autoComplete: 'off',
            },
            styleOverrides: {
                root: {
                    '.MuiInputBase-root': {
                        borderRadius: 32,
                    }
                },
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    height: 48,
                    borderRadius: 32,
                    color: '#fff',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    transition: 'background 0.25s ease-in-out',
                    '&:hover, &:active': {
                        '.MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        }
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '.MuiInputBase-input': {
                        padding: '0 20px',
                        '&:hover, &:focus, &:active': {
                            border: 'none',
                        },
                    }
                }
            }
        },
        MuiIcon: {
            styleOverrides: {
                root: {
                    width: 20,
                    height: 20,
                },
            }
        },
        MuiIconButton: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
                disableFocusRipple: true
            },
            styleOverrides: {
                root: {
                    width: 40,
                    height: 40,
                    padding: 0,
                    background: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.25s ease-in-out, visibility none',
                    '&:hover,&:focus-visible': {
                        background: 'rgba(255, 255, 255, 0.15)',
                    },
                    '&:active, &:focus-visible': {
                        scale: 0.95,
                    }
                }
            }
        },
        MuiAlert: {
            defaultProps: {
                variant: 'filled',
            },
            styleOverrides: {
                root: {
                    opacity: 1,
                    fontWeight: 300,
                    borderRadius: '64px',
                    color: '#ffffff',
                    backdropFilter: 'blur(6px)',
                },
                filledError: {
                    background: '#c9474795',
                },
                filledSuccess: {
                    background: '#47c95a95',
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#fff',
                }
            },
        },
        MuiMenuItem: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
            },
            styleOverrides: {
                root: {
                    paddingLeft: 12,
                    paddingRight: 24,
                    borderRadius: 24,
                    height: 40,
                    '&:hover, &:focus-visible': {
                        background: 'rgba(255, 255, 255, 0.15)',
                    },
                    '.MuiListItemIcon-root': {
                        minWidth: 32,

                    },
                    '.MuiSvgIcon-root': {
                        width: 22,
                        height: 22,
                    },
                    '&+.MuiDivider-root': {
                        margin: '4px 8px',
                        background: 'rgba(255, 255, 255, 0.4)',
                        borderRadius: '2px',
                    },
                },
            }
        },
        MuiTab: {
            defaultProps: {
                disableRipple: true,
                disableFocusRipple: true,
                disableTouchRipple: true
            }
        },
        MuiMenu: {
            styleOverrides: {
                list: {
                    padding: 8,
                },
                paper: {
                    borderRadius: '24px'
                }
            }
        },
        MuiCheckbox: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
                disableFocusRipple: true
            }
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    background: '#1d1827',
                    borderRadius: 512,
                    '&:after': {
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
                    }
                },
            }
        },
    },
    typography: {
        fontFamily: 'Roboto',
        allVariants: {
            color: '#fff',
        },
        body1: {
            fontWeight: 300,
        },
        body2: {
            opacity: 0.7,
            fontWeight: 300,
        },
        subtitle1: {
            fontWeight: 400,
        },
        subtitle2: {
            fontWeight: 300,
        },
        caption: {
            opacity: 0.7,
        },
        button: {
            fontWeight: 300,
        }
    },
    palette: {
        primary: {
            main: '#ee857f',
        },
        error: {
            main: '#c94747',
        },
        success: {
            main: '#47c95a',
        },
        red: { main: '#ee857f' },
        green: { main: '#a5c491', dark: '#254d33' },
        blue: { main: '#a4b7db' },
        orange: { main: '#e88c6e' },
        brown: { main: '#b8927f' },
        yellow: { main: '#d9c755' },
        purple: { main: '#bfa2d3', dark: '#4f2f5b' },
        pink: { main: '#e0bfc3' },
        darkBackground: { main: '#120b1b' },
        background: {
            default: '#1d1827',
            paper: '#262130',
        },
        action: {
            disabledBackground: '#7d6463',
            disabled: '#dedede'
        },
        text: {
            primary: '#f7f7f7',
            secondary: '#1c1c1c'
        }
    },
    breakpoints: {
        values: {
            'xs': 400,
            'sm': 600,
            'md': 900,
            'lg': 1200,
            'xl': 1536
        }
    }
});
