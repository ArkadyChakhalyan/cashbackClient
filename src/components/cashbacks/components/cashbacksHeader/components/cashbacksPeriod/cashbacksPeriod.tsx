import { Button, Stack, Typography } from '@mui/material';
import { MONTH_MAP } from '../../../../../../constants.ts';
import { CASHBACKS_PERIOD_CATEGORIES, CASHBACKS_PERIOD_PERIODS } from './constants.ts';
import { ECashbackPeriod } from '../../../../../../types.ts';
import { theme } from '../../../../../../style/theme.ts';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPeriod } from '../../../../../../store/cashbacks/selectors/getPeriod.ts';
import { setPeriodAC } from '../../../../../../store/cashbacks/cashbackReducer.ts';
import { getIsShowNextMonth } from '../../../../../../selectors/getIsShowNextMonth.ts';

export const CashbacksPeriod = () => {
    const dispatch = useDispatch();

    const period = useSelector(getPeriod);
    const isShowNextMonth = getIsShowNextMonth();

    const onChange = (period: ECashbackPeriod) => {
        dispatch(setPeriodAC(period));
    };

    const currentMonth = new Date().getMonth();
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(currentMonth + 1);
    const nextMonth = nextMonthDate.getMonth();

    return <Stack direction={'row'} gap={0.5} alignItems={'center'}>
        <Typography variant={'subtitle2'} sx={textStyle}>
            {`${CASHBACKS_PERIOD_CATEGORIES}${isShowNextMonth ? '' : ` ${MONTH_MAP[currentMonth]}`}`}
        </Typography>
        {isShowNextMonth &&
            CASHBACKS_PERIOD_PERIODS.map((option, index) => (
                <Stack direction={'row'} gap={0.5} alignItems={'center'} key={option}>
                    {index ? <Typography variant={'subtitle2'} sx={textStyle}>/</Typography> : null}
                    <Button
                        sx={{
                            ...buttonStyle,
                            opacity: option === period ?  1 : 0.5,
                        }}
                        variant={'text'}
                        onClick={() => onChange(option)}
                    >
                        {`${MONTH_MAP[option === ECashbackPeriod.CURRENT_MONTH ? currentMonth : nextMonth]}`}
                    </Button>
                </Stack>
            ))
        }
    </Stack>;
}

const textStyle = {
    lineHeight: 1.75,
    userSelect: 'none',
};

const buttonStyle = {
    background: 'none !important',
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    p: 0,
    minWidth: 'unset',
    height: 'unset',
    justifyContent: 'flex-start',
};
