import React, { FC, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TCashbackFormPeriodProps } from './types.ts';
import { CASHBACK_FORM_PERIOD_MONTH_MAP, CASHBACK_FORM_PERIOD_PERIODS } from './constants.ts';
import { useSelector } from 'react-redux';
import { getPeriod } from '../../../../../../store/cashbacks/selectors/getPeriod.ts';
import { getNextMonthDate } from '../../../../../../selectors/getNextMonthDate.ts';
import { ECashbackPeriod } from '../../../../../../types.ts';
import { isNull } from 'underscore';

export const CashbackFormPeriod: FC<TCashbackFormPeriodProps> = ({
    period,
    setPeriod,
}) => {
    const dashboardPeriod = useSelector(getPeriod);

    const onChange = (period: ECashbackPeriod) => {
        if (isNull(period)) return;
        if (period === ECashbackPeriod.CURRENT_MONTH) {
            setPeriod(new Date().getTime());
        } else {
            setPeriod(getNextMonthDate().getTime());
        }
    };

    useEffect(() => {
        onChange(dashboardPeriod);
    }, [dashboardPeriod]);

    const date = new Date(period);
    let value = ECashbackPeriod.CURRENT_MONTH;
    if (date.getMonth() === getNextMonthDate().getMonth()) {
        value = ECashbackPeriod.NEXT_MONTH;
    }

    return <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(e, value) => onChange(value)}
    >
        {CASHBACK_FORM_PERIOD_PERIODS.map(period => {
            const date = new Date();
            if (period === ECashbackPeriod.NEXT_MONTH) {
                date.setMonth(date.getMonth() + 1);
            }
            return <ToggleButton value={period} key={period}>
                {CASHBACK_FORM_PERIOD_MONTH_MAP[date.getMonth()]}
            </ToggleButton>;
        })}
    </ToggleButtonGroup>;
}
