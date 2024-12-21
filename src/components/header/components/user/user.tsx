import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, IconButton, Skeleton } from '@mui/material';
import { USER_DONATE, USER_LOGOUT, USER_PROFILE } from './constants.ts';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import { getUser } from '../../../../store/userApi/selectors/getUser.ts';
import { useAuth } from '../../../../auth/authContext.tsx';
import { userApiSlice } from '../../../../store/userApi/userApiSlice.ts';
import { TMenuItemProps } from '../../../menu/menuItem/types.ts';
import { Menu } from '../../../menu/menu.tsx';
import { theme } from '../../../../style/theme.ts';
import { Profile } from './components/profile/profile.tsx';
import { cashbackApiSlice } from '../../../../store/cashbackApi/cashbackApiSlice.ts';
import { Donations } from './components/donations/donations.tsx';

export const User = () => {
    const dispatch = useDispatch();

    const { logout } = useAuth();

    const user = useSelector(getUser);

    const [anchor, setAnchor] = useState(null);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isDonationsOpen, setDonationsOpen] = useState(false);

    const onLogout = () => {
        logout();
        dispatch(userApiSlice.util.resetApiState());
        dispatch(cashbackApiSlice.util.resetApiState());
    };

    const onOpenProfile = () => {
        setProfileOpen(true);
    };

    const onOpenDonations = () => {
        setDonationsOpen(true);
    };

    const items: TMenuItemProps[] = [
        {
            label: USER_PROFILE,
            icon: SettingsRoundedIcon,
            onClick: onOpenProfile,
        },
        {
            label: USER_DONATE,
            icon: SavingsRoundedIcon,
            onClick: onOpenDonations,
        },
        {
            label: USER_LOGOUT,
            icon: LogoutRoundedIcon,
            isDivided: true,
            onClick: onLogout,
        }
    ];

    return <>
        {user ?
            <>
                <IconButton
                    sx={userStyle}
                    onClick={(e: React.MouseEvent) => setAnchor(e.currentTarget)}
                >
                    <Avatar alt={user.name} src={user.picture} sx={avatarStyle} />
                </IconButton>
                <Menu
                    sx={{ mt: 1.5 }}
                    slotProps={{
                        paper: { sx: { minWidth: theme.spacing(18) } },
                    }}
                    anchorEl={anchor}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    keepMounted
                    open={!!anchor}
                    onClose={() => setAnchor(null)}
                    items={items}
                />
                <Profile isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} />
                <Donations isOpen={isDonationsOpen} onClose={() => setDonationsOpen(false)} />
            </>
            :
            <Skeleton variant={'circular'} animation={'wave'} sx={userStyle}>
                <Avatar sx={avatarStyle} />
            </Skeleton>
        }
    </>;
}


const userStyle = {
    position: 'absolute',
    right: theme.spacing(2),
    top: '50%',
    transform: 'translateY(-50%)',
};


const avatarStyle = {
    width: theme.spacing(5),
    height: theme.spacing(5),
    pointerEvents: 'none',
};
