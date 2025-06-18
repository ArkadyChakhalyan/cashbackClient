import React, { FC, useEffect, useRef, useState } from 'react';
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

    const ref = useRef(null);

    if (isFilter) {
        chips = chips.filter(chip => chip.toLowerCase().includes(value.toLowerCase()));
    }

    const onAddKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            e.stopPropagation();
            setAdding(false);
        } else if (e.key === 'Enter') {
            e.stopPropagation();
            onAddChip(false);
        }
    };

    const onEditKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            e.stopPropagation();
            setEditName('');
            setEditingChip(null);
        } else if (e.key === 'Enter') {
            e.stopPropagation();
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

    const onEditChip = async (
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
            editingChip ||
            (onChange || onDelete) &&
            target?.className.includes('action')
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

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', });
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
                ref={value === chip ? ref : null}
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
                        <Typography
                            variant={'body2'}
                            fontSize={13}
                            sx={{
                                ...labelStyle,
                                ...(value === chip ? selectedLabelStyle : {}),
                                ...(editingChip === chip ? editingLabelStyle : {}),
                            }}
                        >
                            {chip}
                        </Typography>
                        <Stack direction={'row'} gap={0.25} sx={editingChip === chip ? { opacity: 0 } : {}}>
                            <IconButton
                                sx={actionStyle}
                                className={'action'}
                                onClick={() => {
                                    setEditName(chip);
                                    setEditingChip(chip);
                                }}
                            >
                                <CreateRoundedIcon sx={iconStyle} />
                            </IconButton>
                            <IconButton
                                sx={actionStyle}
                                className={'action'}
                                onClick={async () => {
                                    await onDelete(chip);
                                    if (value !== chip) return;
                                    onSelect('');
                                }}
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
                            <AddRoundedIcon style={{ opacity: isAdding ? 0 : 0.75 }} />
                            <Typography variant={'body2'} fontSize={13} sx={isAdding ? { opacity: 0 } : {}}>
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
    height: theme.spacing(4.5),
    overflow: 'scroll',
    mb: theme.spacing(-0.5),
    '::-webkit-scrollbar': {
        display: 'none'
    }
};

const labelStyle = {
    opacity: 0.7,
};

const selectedLabelStyle = {
    opacity: 1,
};

const editingLabelStyle = {
    opacity: 0,
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
    boxShadow: 'none !important',
    opacity: '0.8',
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
