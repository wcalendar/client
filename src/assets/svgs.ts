import MyPageIcon from '@/assets/my_page.svg';
import { FC, SVGProps } from 'react';

export type SVGKey = 'myPage';

const svgs: Record<SVGKey, FC<SVGProps<SVGSVGElement>>> = {
  myPage: MyPageIcon,
}

export default svgs;