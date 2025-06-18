import React from 'react';
import { Modal } from '../../../../../../../modal/modal.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    getOpenedCashbackCodesInfo
} from '../../../../../../../../store/cashbacks/selectors/getOpenedCashbackCodesInfo.ts';
import { setOpenedCashbackCodesInfoAC } from '../../../../../../../../store/cashbacks/cashbackReducer.ts';
import { Stack, Typography } from '@mui/material';
import { CASHBACK_ACTIONS_CODES_EXCLUDE, CASHBACK_ACTIONS_CODES_TITLE } from './constants.ts';
import { theme } from '../../../../../../../../style/theme.ts';
import { getIsMobile } from '../../../../../../../../selectors/getIsMobile.ts';

export const CashbackActionsCodes = () => {
    const dispatch = useDispatch();

    const codesInfo = useSelector(getOpenedCashbackCodesInfo);

    const onClose = () => {
        dispatch(setOpenedCashbackCodesInfoAC(null));
    };

    return <Modal
        body={<>
            {codesInfo &&
                <Stack gap={2} sx={getIsMobile() ? { width: '100%'} : {}}>
                    <Stack alignItems={'center'} sx={headerStyle}>
                        <Typography variant={'h5'} fontWeight={300}>
                            {`${CASHBACK_ACTIONS_CODES_TITLE} ${codesInfo.isExclude ? CASHBACK_ACTIONS_CODES_EXCLUDE : ''}`}
                        </Typography>
                    </Stack>
                    <Typography variant={'body2'} textAlign={'left'}>
                        {codesInfo.codes.join(', ')}
                    </Typography>
                </Stack>
            }
        </>}
        isOpen={!!codesInfo}
        onClose={onClose}
    />
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
    color: theme.palette.blue.main,
    [theme.breakpoints.down('sm')]: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
};
