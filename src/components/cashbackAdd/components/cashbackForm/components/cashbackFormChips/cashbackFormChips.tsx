import React, { FC, useEffect, useState } from 'react';
import { alpha, Chip, IconButton, Stack, TextField, Typography } from '@mui/material';
import { TCashbackFormNameProps } from './types.ts';
import { theme } from '../../../../../../style/theme.ts';
import { CASHBACK_FORM_CHIPS_NOT_FOUND } from './constants.ts';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { showErrorSnackbar } from '../../../../../snackbarStack/helpers/showErrorSnackbar.ts';

export const CashbackFormChips: FC<TCashbackFormNameProps> = ({
    addLabel,
    chips,
    duplicateError,
    isDisabled,
    isFilter,
    notFoundLabel,
    value,
    onAdd,
    onChange,
    onDelete,
    onSelect,
}) => {
    const [isAdding, setAdding] = useState(null);
    const [addName, setAddName] = useState('');
    const [editingChip, setEditingChip] = useState(null);
    const [editName, setEditName] = useState('');

    if (isFilter) {
        chips = chips.filter(chip => chip.toLowerCase().includes(value.toLowerCase()));
    }

    const onAddKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            e.stopPropagation();
            setAdding(false);
        } else if (e.key === 'Enter') {
            onAddChip(false);
        }
    };

    const onEditKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            e.stopPropagation();
            setEditName('');
            setEditingChip(null);
        } else if (e.key === 'Enter') {
            onEditChip(false);
        }
    };

    const onResetAdd = () => {
        setAdding(false);
        setAddName('');
    };

    const onResetEdit = () => {
        setEditingChip(null);
        setEditName('');
    };

    const onAddChip = (
        isCloseOnError: boolean = true,
    ) => {
        const name = addName.trim();
        if (!name) {
            setAdding(false);
            return;
        }
        if (chips.includes(name)) {
            showErrorSnackbar(duplicateError);
            if (isCloseOnError) {
                onResetAdd();
            }
            return;
        }

        onAdd(name);
        onResetAdd();
    };

    const onEditChip = (
        isCloseOnError: boolean = true,
    ) => {
        const name = editName.trim();
        if (!name || name === editingChip) {
            onResetEdit();
            return;
        }
        if (chips.filter(chip => chip === name).length > 1) {
            showErrorSnackbar(duplicateError);
            if (isCloseOnError) {
                onResetEdit();
            }
            return;
        }

        onChange(editingChip, name);
        onResetEdit();
    };

    const onChipClick = (
        e: React.MouseEvent,
        chip: string,
    ) => {
        const target = e.target as HTMLElement;
        if (
            onChange || onDelete &&
            (
                chip === editingChip ||
                target?.className.includes('MuiButton')
            )
        ) {
            return;
        }
        if (value === chip) {
            onSelect('');
        } else {
            onSelect(chip);
        }
    }

    useEffect(() => {
        setAdding(false);
    }, [chips]);

    const isAdd = !!onAdd;

    return <Stack spacing={0.75} direction={'row'} sx={containerStyle}>
        {!chips.length && !isAdd &&
            <Typography variant={'body2'} sx={textStyle}>
                {notFoundLabel || CASHBACK_FORM_CHIPS_NOT_FOUND}
            </Typography>
        }
        {chips.map((chip) =>
            <Chip
                key={chip}
                disabled={isDisabled}
                sx={{
                    ...chipStyle,
                    ...(editingChip === chip ? editingStyle : {}),
                    border: `1px solid ${value === chip ? theme.palette.primary.main : 'transparent'}`,
                    color: value === chip ? theme.palette.common.white : alpha(theme.palette.common.white, 0.7),
                    '.MuiChip-label': {
                        pr: onChange || onDelete ? 0.75 : 1.5,
                    },
                }}
                label={onChange || onDelete ?
                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                        {chip}
                        <Stack direction={'row'} gap={0.25}>
                            <IconButton
                                sx={actionStyle}
                                onClick={() => {
                                    setEditName(chip);
                                    setEditingChip(chip);
                                }}
                            >
                                <CreateRoundedIcon sx={iconStyle} />
                            </IconButton>
                            <IconButton
                                sx={actionStyle}
                                onClick={() => onDelete(chip)}
                            >
                                <DeleteRoundedIcon sx={{ ...iconStyle, color: theme.palette.primary.main }} />
                            </IconButton>
                        </Stack>
                        {editingChip === chip &&
                            <TextField
                                inputRef={input => input && input.focus()}
                                sx={inputStyle}
                                value={editName}
                                onKeyDown={onEditKeyDown}
                                onBlur={() => onEditChip()}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        }
                    </Stack>
                    : chip
                }
                onClick={e => onChipClick(e, chip)}
            />
        )}
        {isAdd &&
            <Chip
                sx={{
                    ...chipStyle,
                    ...addStyle,
                    ...(isAdding ? editingStyle : {}),
                }}
                onClick={() => {
                    if (isAdding) return;
                    setAdding(true);
                }}
                disabled={isDisabled}
                label={
                    <>
                        <Stack direction={'row'} gap={0.25} alignItems={'center'}>
                            <AddRoundedIcon style={{ opacity: 0.75 }} />
                            <Typography variant={'body2'} fontSize={13}>
                                {addLabel}
                            </Typography>
                        </Stack>
                        {isAdding &&
                            <TextField
                                inputRef={input => input && input.focus()}
                                sx={inputStyle}
                                onKeyDown={onAddKeyDown}
                                value={addName}
                                onBlur={() => onAddChip()}
                                onChange={(e) => setAddName(e.target.value)}
                            />
                        }
                    </>
                }
            />
        }
    </Stack>;
}

const containerStyle = {
    height: theme.spacing(4),
    overflow: 'scroll',
    '::-webkit-scrollbar': {
        display: 'none'
    }
};

const textStyle = {
    alignSelf: 'center',
    ml: `${theme.spacing(1.5)} !important`,
};

const chipStyle = {
    position: 'relative',
    minWidth: 'fit-content',
    overflow: 'hidden',
};

const addStyle = {
    '.MuiChip-label': {
        pl: 0.75,
    },
};

const editingStyle = {
    scale: `1 !important`,
};

const inputStyle = {
    position: 'absolute',
    inset: 0,
    bgcolor: '#3a3248 !important',
    '.MuiInputBase-root': {
        background: 'none !important',
    },
    '.MuiInputBase-input': {
        px: `${theme.spacing(1.5)} !important`,
        fontSize: 13,
    },
};

const actionStyle = {
    height: theme.spacing(3),
    width: theme.spacing(3),
    background: 'none !important',
    opacity: '0.75',
    '&:hover,&:focus': {
        opacity: 1,
    },
    'svg': {
        pointerEvents: 'none',
    },
};

const iconStyle = {
    height: theme.spacing(2.75),
    width: theme.spacing(2.75),
};
