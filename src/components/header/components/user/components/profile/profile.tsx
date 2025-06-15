import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { TProfileProps } from './types.ts';
import { useDeleteUserMutation, userApiSlice } from '../../../../../../store/userApi/userApiSlice.ts';
import { useAuth } from '../../../../../../auth/authContext.tsx';
import { getUser } from '../../../../../../store/userApi/selectors/getUser.ts';
import { Modal } from '../../../../../modal/modal.tsx';
import { theme } from '../../../../../../style/theme.ts';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { PROFILE_DELETE, PROFILE_LOGOUT } from './constants.ts';
import { showErrorSnackbar } from '../../../../../snackbarStack/helpers/showErrorSnackbar.ts';
import { cashbackApiSlice } from '../../../../../../store/cashbackApi/cashbackApiSlice.ts';

export const Profile: FC<TProfileProps> = ({
    isOpen,
    onClose,
}) => {
    const dispatch = useDispatch();

    const [deleteUser, {
        isLoading,
        isError,
        isSuccess,
    }] = useDeleteUserMutation();

    const { logout } = useAuth();

    const user = useSelector(getUser);

    const onLogout = () => {
        logout();
        dispatch(userApiSlice.util.resetApiState());
        dispatch(cashbackApiSlice.util.resetApiState());
    };

    const onDelete = () => {
        try {
            deleteUser(null);
            onLogout();
        } catch {
            showErrorSnackbar();
        }
    };

    useEffect(() => {
        if (!isError) return;
        showErrorSnackbar();
    }, [isError]);

    const actions = [
        {
            label: PROFILE_LOGOUT,
            icon: <LogoutRoundedIcon />,
            onClick: onLogout,
        },
        {
            label: PROFILE_DELETE,
            icon: <DeleteRoundedIcon />,
            onClick: onDelete,
        },
    ];

    const body = <Stack alignItems={'center'} gap={2} width={'100%'}>
        <Avatar alt={user.name} src={user.picture} sx={avatarStyle} />
        <Stack alignItems={'center'}>
            <Typography variant={'subtitle1'}>{user.name}</Typography>
            <Typography variant={'subtitle2'} sx={{ opacity: 0.8 }}>{user.email}</Typography>
        </Stack>
        <Stack gap={1} width={'100%'} alignItems={'center'}>
            {actions.map(action => (
                <Button
                    key={action.label}
                    variant={'outlined'}
                    sx={buttonStyle}
                    startIcon={action.icon}
                    onClick={action.onClick}
                >
                    {action.label}
                </Button>
            ))}
        </Stack>
    </Stack>;

    return <Modal
        body={body}
        isOpen={isOpen}
        onClose={onClose}
    />;
}

const avatarStyle = {
    width: theme.spacing(10),
    height: theme.spacing(10),
    pointerEvents: 'none',
};

const buttonStyle = {
    width: theme.spacing(26),
    maxWidth: '100%',
    height: theme.spacing(5),
    background: 'none',
    backdropFilter: 'none',
    '&:hover, &:focus': {
        background: theme.palette.primary.main,
    },
    [theme.breakpoints.down('xs')]: {
        width: '100%',
    }
};
