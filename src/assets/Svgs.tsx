import MainLogoBigIcon from '@/assets/main_logo_big.svg';
import MainLogoSmallIcon from '@/assets/main_logo_small.svg';
import LogoBigIcon from '@/assets/logo_big.svg';
import LogoSmallIcon from '@/assets/logo_small.svg';
import CalendarIcon from '@/assets/calendar.svg';
import CalendarSmallIcon from '@/assets/calendar_small.svg';
import CategoryIcon from '@/assets/category.svg';
import MyPageIcon from '@/assets/my_page.svg';
import UnionIcon from '@/assets/union.svg';
import PreferenceIcon from '@/assets/preference.svg';
import SearchIcon from '@/assets/search.svg';
import MoveIcon from '@/assets/move.svg';
import MenuIcon from '@/assets/menu.svg';
import ArrowLeftIcon from '@/assets/arrow_left.svg';
import ArrowLeftSmallIcon from '@/assets/arrow_left_small.svg';
import ArrowRightIcon from '@/assets/arrow_right.svg';
import ArrowRightSmallIcon from '@/assets/arrow_right_small.svg';
import ArrowDownSmallIcon from '@/assets/arrow_down_small.svg';
import ArrowDownIcon from '@/assets/arrow_down.svg';
import DoubleArrowRightIcon from '@/assets/double_arrow_right.svg'
import SmallCheckBoxOpenIcon from '@/assets/check_box_small_open.svg';
import SmallCheckBoxClosedIcon from '@/assets/check_box_small_closed.svg';
import BigCheckBoxOpenIcon from '@/assets/check_box_big_open.svg';
import BigCheckBoxClosedIcon from '@/assets/check_box_big_closed.svg';

export type SVGKey = 'calendar' | 'calendarSmall' | 'category' | 'myPage' | 'union' | 'preference' | 'search' | 'move' | 'menu' |
'smallCheckBoxOpen' | 'smallCheckBoxClosed' | 'bigCheckBoxOpen' | 'bigCheckBoxClosed' |
'arrowLeft' | 'arrowLeftSmall' | 'arrowRight' | 'arrowRightSmall' | 'arrowDownSmall' | 'arrowDown' | 'doubleArrowRight' |
'logoBig' | 'logoSmall' | 'mainLogoBig' | 'mainLogoSmall';

interface SvgsProps {
  svgKey: SVGKey;
  className?: string;
}

export default function Svgs({
  svgKey,
  className,
}: SvgsProps) {
  if(svgKey === 'mainLogoBig') return <MainLogoBigIcon className={className} />;
  if(svgKey === 'mainLogoSmall') return <MainLogoSmallIcon className={className} />;
  if(svgKey === 'logoBig') return <LogoBigIcon className={className} />;
  if(svgKey === 'logoSmall') return <LogoSmallIcon className={className} />;
  if(svgKey === 'calendar') return <CalendarIcon className={className} />;
  if(svgKey === 'calendarSmall') return <CalendarSmallIcon className={className} />;
  if(svgKey === 'category') return <CategoryIcon className={className} />;
  if(svgKey === 'myPage') return <MyPageIcon className={className} />;
  if(svgKey === 'union') return <UnionIcon className={className} />;
  if(svgKey === 'preference') return <PreferenceIcon className={className} />;
  if(svgKey === 'search') return <SearchIcon className={className} />;
  if(svgKey === 'move') return <MoveIcon className={className} />;
  if(svgKey === 'menu') return <MenuIcon className={className} />;
  if(svgKey === 'arrowLeft') return <ArrowLeftIcon className={className} />;
  if(svgKey === 'arrowLeftSmall') return <ArrowLeftSmallIcon className={className} />;
  if(svgKey === 'arrowRight') return <ArrowRightIcon className={className} />;
  if(svgKey === 'arrowRightSmall') return <ArrowRightSmallIcon className={className} />;
  if(svgKey === 'arrowDown') return <ArrowDownIcon className={className} />;
  if(svgKey === 'arrowDownSmall') return <ArrowDownSmallIcon className={className} />;
  if(svgKey === 'doubleArrowRight') return <DoubleArrowRightIcon className={className} />;
  if(svgKey === 'bigCheckBoxOpen') return <BigCheckBoxOpenIcon className={className} />;
  if(svgKey === 'bigCheckBoxClosed') return <BigCheckBoxClosedIcon className={className} />;
  if(svgKey === 'smallCheckBoxOpen') return <SmallCheckBoxOpenIcon className={className} />;
  if(svgKey === 'smallCheckBoxClosed') return <SmallCheckBoxClosedIcon className={className} />;
  
  return (<></>);
}