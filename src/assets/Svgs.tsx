import MainLogoBigIcon from '@/assets/main_logo_big.svg';
import LogoBigIcon from '@/assets/logo_big.svg';
import LogoSmallIcon from '@/assets/logo_small.svg';
import MyPageIcon from '@/assets/my_page.svg';
import UnionIcon from '@/assets/union.svg';
import PreferenceIcon from '@/assets/preference.svg';
import ArrowLeftIcon from '@/assets/arrow_left.svg';
import SmallCheckBoxOpenIcon from '@/assets/check_box_small_open.svg';
import SmallCheckBoxClosedIcon from '@/assets/check_box_small_closed.svg';
import BigCheckBoxOpenIcon from '@/assets/check_box_big_open.svg';
import BigCheckBoxClosedIcon from '@/assets/check_box_big_closed.svg';

export type SVGKey = 'myPage' | 'union' | 'preference' | 'smallCheckBoxOpen' | 'smallCheckBoxClosed' | 'bigCheckBoxOpen' | 'bigCheckBoxClosed' | 'arrowLeft' | 'logoBig' | 'logoSmall' | 'mainLogoBig';

interface SvgsProps {
  svgKey: SVGKey;
}

export default function Svgs({
  svgKey,
}: SvgsProps) {
  if(svgKey === 'mainLogoBig') return <MainLogoBigIcon />;
  if(svgKey === 'logoBig') return <LogoBigIcon />;
  if(svgKey === 'logoSmall') return <LogoSmallIcon />;
  if(svgKey === 'myPage') return <MyPageIcon />;
  if(svgKey === 'union') return <UnionIcon />;
  if(svgKey === 'preference') return <PreferenceIcon />;
  if(svgKey === 'arrowLeft') return <ArrowLeftIcon />;
  if(svgKey === 'bigCheckBoxOpen') return <BigCheckBoxOpenIcon />;
  if(svgKey === 'bigCheckBoxClosed') return <BigCheckBoxClosedIcon />;
  if(svgKey === 'smallCheckBoxOpen') return <SmallCheckBoxOpenIcon />;
  if(svgKey === 'smallCheckBoxClosed') return <SmallCheckBoxClosedIcon />;
  
  return (<></>);
}