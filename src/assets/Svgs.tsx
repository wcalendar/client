import MyPageIcon from '@/assets/my_page.svg';
import UnionIcon from '@/assets/union.svg';

export type SVGKey = 'myPage' | 'union';

interface SvgsProps {
  svgKey: SVGKey;
}

export default function Svgs({
  svgKey,
}: SvgsProps) {
  if(svgKey === 'myPage') return <MyPageIcon />;
  if(svgKey === 'union') return <UnionIcon />;
  
  return (<></>);
}