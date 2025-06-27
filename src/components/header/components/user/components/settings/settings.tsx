import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alpha, FormControlLabel, Stack, Switch, Typography } from '@mui/material';
import { TSettingsProps } from './types.ts';
import { useDeleteUserMutation, useUpdateUserMutation } from '../../../../../../store/userApi/userApiSlice.ts';
import { getUser } from '../../../../../../store/userApi/selectors/getUser.ts';
import { Modal } from '../../../../../modal/modal.tsx';
import { SETTINGS_TITLE, SETTINGS_VIEW_STORIES_TITLE, SETTINGS_VIEW_TITLE } from './constants.ts';
import { showErrorSnackbar } from '../../../../../snackbarStack/helpers/showErrorSnackbar.ts';
import { theme } from '../../../../../../style/theme.ts';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import { getSettings } from '../../../../../../store/userApi/selectors/getSettings.ts';
import { ISettings } from 'cashback-check-types';

export const Settings: FC<TSettingsProps> = ({
    isOpen,
    onClose,
}) => {
    const dispatch = useDispatch();

    const [updateUser, {
        isLoading,
        isError,
        isSuccess,
    }] = useUpdateUserMutation();

    const settings = useSelector(getSettings);
    const {
        isHideStories,
    } = settings;

    const onUpdateSettings = (
        update: Partial<ISettings>,
    ) => {
        updateUser({
            settings: {
                ...settings,
                ...update,
            },
        });
    };

    useEffect(() => {
        if (!isError) return;
        showErrorSnackbar();
    }, [isError]);

    const body = <Stack alignItems={'center'} gap={2} width={'100%'}>
        <Stack alignItems={'center'} sx={headerStyle}>
            <SettingsSuggestRoundedIcon sx={iconStyle} />
            <Typography variant={'h5'} fontWeight={300}>
                {SETTINGS_TITLE}
            </Typography>
        </Stack>
        <Stack sx={blockStyle} gap={1}>
            <Typography variant={'subtitle1'} fontWeight={300}>
                {SETTINGS_VIEW_TITLE}
            </Typography>
            <FormControlLabel
                sx={formStyle}
                slotProps={{
                    typography: {
                        variant: 'body2',
                        fontWeight: 300,
                        sx: { userSelect: 'none', },
                    }
                }}
                labelPlacement={'start'}
                control={<Switch
                    checked={!isHideStories}
                    onChange={() => {
                        onUpdateSettings({ isHideStories: !isHideStories });
                    }}
                />}
                label={SETTINGS_VIEW_STORIES_TITLE}
            />
        </Stack>
    </Stack>;

    return <Modal
        body={body}
        isOpen={isOpen}
        onClose={onClose}
    />;
}

const headerStyle = {
    gap: 1.5,
    [theme.breakpoints.down('sm')]: {
        gap: 0.5,
    }
};

const iconStyle = {
    width: theme.spacing(12),
    height: theme.spacing(12),
    ml: 2,
    color: theme.palette.blue.main,
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
};

const formStyle = {
    justifyContent: 'space-between',
    width: '100%',
    ml: 0,
};

const blockStyle = {
    width: '100%',
    maxWidth: theme.spacing(60),
};
