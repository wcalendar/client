import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

type CategoryColorSelectorProps = {
  onColorChange: (selectedColor: string) => void;
};

const TestSelect = styled.select`
  display: flex;
`;

//TODO 범주 컴포넌트 구현

const colorOptions = [
  { label: 'Red', color: '#FF0000' },
  { label: 'Orange', color: '#FFA500' },
  { label: 'Yellow', color: '#FFFF00' },
  { label: 'Green', color: '#008000' },
  { label: 'Blue', color: '#0000FF' },
  { label: 'Indigo', color: '#4B0082' },
  { label: 'Violet', color: '#9400D3' },
];

export default function CategoryColorSelector({
  onColorChange,
}: CategoryColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    colorOptions[0].color,
  );

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const color = event.target.value;
    setSelectedColor(color);
    onColorChange(color);
  };
  return (
    <div style={{ display: 'flex' }}>
      <TestSelect value={selectedColor} onChange={handleColorChange}>
        {colorOptions.map(option => (
          <option
            key={option.label}
            value={option.color}
            style={{
              backgroundColor: option.color,
            }}
          >
            {option.label}
          </option>
        ))}
      </TestSelect>
    </div>
  );
}
