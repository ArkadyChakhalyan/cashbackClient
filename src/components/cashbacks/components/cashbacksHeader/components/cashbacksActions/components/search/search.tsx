import { alpha, Grow, IconButton, Skeleton, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useRef } from 'react';
import { theme } from '../../../../../../../../style/theme.ts';
import { setIsSearchModeAC, setSearchQueryAC } from '../../../../../../../../store/cashbacks/cashbackReducer.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchQuery } from '../../../../../../../../store/cashbacks/selectors/getSearchQuery.ts';
import { SEARCH_PLACEHOLDER } from './constants.ts';
import { getIsLoading } from '../../../../../../../../store/cashbackApi/selectors/getIsLoading.ts';
import { getCashbacks } from '../../../../../../../../store/cashbackApi/selectors/getCashbacks.ts';
import { getIsSearchMode } from '../../../../../../../../store/cashbacks/selectors/getIsSearchMode.ts';
import { CASHBACK_HEADER_HIDE_TIMEOUT } from '../../../../constants.ts';

export const Search = () => {
    const dispatch = useDispatch();

    const isLoading = useSelector(getIsLoading);
    const searchQuery = useSelector(getSearchQuery);
    const isCashbacks = useSelector(getCashbacks).length;
    const isSearchMode = useSelector(getIsSearchMode);

    const closeRef = useRef(null);

    const onOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(setIsSearchModeAC(true));
    };

    const onClose = () => {
        dispatch(setIsSearchModeAC(false));
        dispatch(setSearchQueryAC(''));
    };

    const onBlur = (e: React.FocusEvent) => {
        if (e.relatedTarget && e.relatedTarget === closeRef.current || searchQuery) return;
        onClose();
    };

    const onEscape = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQueryAC(e.target.value.trim()));
    };

    return <>
        {isLoading ?
            <Skeleton variant={'circular'} width={theme.spacing(5)} height={theme.spacing(5)} />
            : isCashbacks ?
                <>
                    <Grow appear={false} in={!isSearchMode} timeout={CASHBACK_HEADER_HIDE_TIMEOUT}>
                        <IconButton onClick={onOpen}>
                            <SearchRoundedIcon />
                        </IconButton>
                    </Grow>
                    <Grow appear in={isSearchMode} timeout={isSearchMode ? 600 : 200}>
                        <TextField
                            inputRef={input => input && input.focus()}
                            onBlur={onBlur}
                            onKeyDown={onEscape}
                            onChange={onChange}
                            value={searchQuery}
                            placeholder={SEARCH_PLACEHOLDER}
                            sx={inputStyle}
                            slotProps={{
                                input: {
                                    startAdornment: <SearchRoundedIcon/>,
                                    endAdornment: <IconButton onClick={onClose} sx={closeStyle} ref={closeRef}>
                                        <CloseRoundedIcon sx={{ width: theme.spacing(2.5), height: theme.spacing(2.5) }} />
                                    </IconButton>
                                },
                            }}
                        />
                    </Grow>
                </>
                : null
        }
    </>;
}

const inputStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    '.MuiInputBase-root': {
        pr: 1,
    },
    '.MuiInputBase-input': {
        px: `${theme.spacing()} !important`,
    }
};

const closeStyle = {
    width: theme.spacing(4),
    height: theme.spacing(4),
    bgcolor: alpha(theme.palette.common.white, 0.05),
};
