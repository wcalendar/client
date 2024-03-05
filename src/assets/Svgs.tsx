import MainLogoBigIcon from '@/assets/main_logo_big.svg';
import MainLogoSmallIcon from '@/assets/main_logo_small.svg';
import LogoBigIcon from '@/assets/logo_big.svg';
import LogoSmallIcon from '@/assets/logo_small.svg';
import CalendarIcon from '@/assets/calendar.svg';
import MyPageIcon from '@/assets/my_page.svg';
import UnionIcon from '@/assets/union.svg';
import PreferenceIcon from '@/assets/preference.svg';
import SearchIcon from '@/assets/search.svg';
import ArrowLeftIcon from '@/assets/arrow_left.svg';
import ArrowLeftSmallIcon from '@/assets/arrow_left_small.svg';
import ArrowRightSmallIcon from '@/assets/arrow_right_small.svg';
import ArrowDownSmallIcon from '@/assets/arrow_down_small.svg';
import ArrowDownIcon from '@/assets/arrow_down.svg';
import SmallCheckBoxOpenIcon from '@/assets/check_box_small_open.svg';
import SmallCheckBoxClosedIcon from '@/assets/check_box_small_closed.svg';
import BigCheckBoxOpenIcon from '@/assets/check_box_big_open.svg';
import BigCheckBoxClosedIcon from '@/assets/check_box_big_closed.svg';

export type SVGKey = 'calendar' | 'myPage' | 'union' | 'preference' | 'search' |
'smallCheckBoxOpen' | 'smallCheckBoxClosed' | 'bigCheckBoxOpen' | 'bigCheckBoxClosed' |
'arrowLeft' | 'arrowLeftSmall' | 'arrowRightSmall' | 'arrowDownSmall' | 'arrowDown' |
'logoBig' | 'logoSmall' | 'mainLogoBig' | 'mainLogoSmall';

interface SvgsProps {
  svgKey: SVGKey;
}

export default function Svgs({
  svgKey,
}: SvgsProps) {
  if(svgKey === 'mainLogoBig') return <MainLogoBigIcon />;
  if(svgKey === 'mainLogoSmall') return <MainLogoSmallIcon />;
  if(svgKey === 'logoBig') return <LogoBigIcon />;
  if(svgKey === 'logoSmall') return <LogoSmallIcon />;
  if(svgKey === 'calendar') return <CalendarIcon />;
  if(svgKey === 'myPage') return <MyPageIcon />;
  if(svgKey === 'union') return <UnionIcon />;
  if(svgKey === 'preference') return <PreferenceIcon />;
  if(svgKey === 'search') return <SearchIcon />;
  if(svgKey === 'arrowLeft') return <ArrowLeftIcon />;
  if(svgKey === 'arrowLeftSmall') return <ArrowLeftSmallIcon />;
  if(svgKey === 'arrowRightSmall') return <ArrowRightSmallIcon />;
  if(svgKey === 'arrowDown') return <ArrowDownIcon />;
  if(svgKey === 'arrowDownSmall') return <ArrowDownSmallIcon />;
  if(svgKey === 'bigCheckBoxOpen') return <BigCheckBoxOpenIcon />;
  if(svgKey === 'bigCheckBoxClosed') return <BigCheckBoxClosedIcon />;
  if(svgKey === 'smallCheckBoxOpen') return <SmallCheckBoxOpenIcon />;
  if(svgKey === 'smallCheckBoxClosed') return <SmallCheckBoxClosedIcon />;
  
  return (<></>);
}