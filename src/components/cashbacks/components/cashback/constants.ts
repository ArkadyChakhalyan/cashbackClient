import { ECashbackColor, ECashbackIcon } from 'cashback-check-types';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import LocalTaxiRoundedIcon from '@mui/icons-material/LocalTaxiRounded';
import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import TimeToLeaveRoundedIcon from '@mui/icons-material/TimeToLeaveRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import LocalFloristRoundedIcon from '@mui/icons-material/LocalFloristRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChairRoundedIcon from '@mui/icons-material/ChairRounded';
import TheaterComedyRoundedIcon from '@mui/icons-material/TheaterComedyRounded';
import SportsFootballRoundedIcon from '@mui/icons-material/SportsFootballRounded';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import TrainRoundedIcon from '@mui/icons-material/TrainRounded';
import HeadsetRoundedIcon from '@mui/icons-material/HeadsetRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded';
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded';
import ChildFriendlyRoundedIcon from '@mui/icons-material/ChildFriendlyRounded';
import DataSaverOnRoundedIcon from '@mui/icons-material/DataSaverOnRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import LocalAirportRoundedIcon from '@mui/icons-material/LocalAirportRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import { theme } from '../../../../style/theme.ts';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';

export const CASHBACK_ICON_MAP: {[key: string]: OverridableComponent<SvgIconTypeMap>}= {
    [ECashbackIcon.COMMON]: AccountBalanceWalletRoundedIcon,
    [ECashbackIcon.TAXI]: LocalTaxiRoundedIcon,
    [ECashbackIcon.GROCERY]: LocalGroceryStoreRoundedIcon,
    [ECashbackIcon.RESTAURANT]: RestaurantRoundedIcon,
    [ECashbackIcon.FAST_FOOD]: FastfoodRoundedIcon,
    [ECashbackIcon.CARSHARING]: TimeToLeaveRoundedIcon,
    [ECashbackIcon.PHARMACY]: LocalHospitalRoundedIcon,
    [ECashbackIcon.CLOTHES]: LocalMallRoundedIcon,
    [ECashbackIcon.FLOWERS]: LocalFloristRoundedIcon,
    [ECashbackIcon.EDUCATION]: SchoolRoundedIcon,
    [ECashbackIcon.HOME]: HomeRoundedIcon,
    [ECashbackIcon.FURNITURE]: ChairRoundedIcon,
    [ECashbackIcon.ART]: TheaterComedyRoundedIcon,
    [ECashbackIcon.SPORT]: SportsFootballRoundedIcon,
    [ECashbackIcon.CINEMA]: MovieCreationRoundedIcon,
    [ECashbackIcon.BOOKS]: AutoStoriesRoundedIcon,
    [ECashbackIcon.UTILS]: ReceiptRoundedIcon,
    [ECashbackIcon.TRANSPORT]: TrainRoundedIcon,
    [ECashbackIcon.MUSIC]: HeadsetRoundedIcon,
    [ECashbackIcon.APPLIANCES]: DevicesRoundedIcon,
    [ECashbackIcon.GAS]: LocalGasStationRoundedIcon,
    [ECashbackIcon.BEAUTY]: ContentCutRoundedIcon,
    [ECashbackIcon.KIDS]: ChildFriendlyRoundedIcon,
    [ECashbackIcon.ANIMALS]: PetsRoundedIcon,
    [ECashbackIcon.ACCESSORIES]: DiamondRoundedIcon,
    [ECashbackIcon.MARKET]: StorefrontRoundedIcon,
    [ECashbackIcon.TRAVEL]: LocalAirportRoundedIcon,
    [ECashbackIcon.SMILE]: SentimentSatisfiedRoundedIcon,
    [ECashbackIcon.OTHER]: DataSaverOnRoundedIcon,
};

export const CASHBACK_COLOR_MAP: {[key: string]: string} = {
    [ECashbackColor.BLUE]: theme.palette.blue.main,
    [ECashbackColor.BROWN]: theme.palette.brown.main,
    [ECashbackColor.PINK]: theme.palette.pink.main,
    [ECashbackColor.RED]: theme.palette.red.main,
    [ECashbackColor.ORANGE]: theme.palette.orange.main,
    [ECashbackColor.YELLOW]: theme.palette.yellow.main,
    [ECashbackColor.GREEN]: theme.palette.green.main,
    [ECashbackColor.DARK_GREEN]: theme.palette.green.dark,
    [ECashbackColor.PURPLE]: theme.palette.purple.main,
    [ECashbackColor.DARK_PURPLE]: theme.palette.purple.dark,
};
