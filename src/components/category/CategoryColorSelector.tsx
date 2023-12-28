import { Dispatch, SetStateAction } from 'react';

type CategoryColorSelectorProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

//TODO 범주 컴포넌트 구현

export default function CategoryColorSelector({
  color,
  setColor,
}: CategoryColorSelectorProps) {
  return <div>CategoryColorSelector</div>;
}
