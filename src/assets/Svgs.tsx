import MyPageIcon from '@/assets/my_page.svg';
import UnionIcon from '@/assets/union.svg';
import SmallCheckBoxOpenIcon from '@/assets/check_box_small_open.svg';
import SmallCheckBoxClosedIcon from '@/assets/check_box_small_closed.svg';
import BigCheckBoxOpenIcon from '@/assets/check_box_big_open.svg';
import BigCheckBoxClosedIcon from '@/assets/check_box_big_closed.svg';

export type SVGKey = 'myPage' | 'union' | 'smallCheckBoxOpen' | 'smallCheckBoxClosed' | 'bigCheckBoxOpen' | 'bigCheckBoxClosed';

interface SvgsProps {
  svgKey: SVGKey;
}

export default function Svgs({
  svgKey,
}: SvgsProps) {
  if(svgKey === 'myPage') return <MyPageIcon />;
  if(svgKey === 'union') return <UnionIcon />;
  if(svgKey === 'bigCheckBoxOpen') return <BigCheckBoxOpenIcon />;
  if(svgKey === 'bigCheckBoxClosed') return <BigCheckBoxClosedIcon />;
  if(svgKey === 'smallCheckBoxOpen') return <SmallCheckBoxOpenIcon />;
  if(svgKey === 'smallCheckBoxClosed') return <SmallCheckBoxClosedIcon />;
  
  return (<></>);
}