import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

type DropdownProps = {
  values: string[];
  selectedIdx: number;
  onChange: (idx: number) => void;
  width?: string;
  height: string;
}

const Container = styled.div<{ $width?: string, $height: string }>`
  position: relative;
  width: ${({ $width }) => $width ? $width : '100%'};
  height: ${({ $height }) => $height};
  cursor: pointer;
`;

const Input = styled.div<{ $height: string, }>`
  position: relative;
  width: 100%;
  height: ${({ $height }) => $height};
  line-height: ${({ $height }) => $height};
  font-size: .75rem;
  text-indent: .5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
`;

const IconWrapper = styled.div<{ $height: string, }>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${({ $height }) => $height};
  height: ${({ $height }) => $height};
  padding: calc(${({ $height }) => $height} / 8);
  text-indent: 0;
`;

const ListWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  max-height: 500%;
  position: absolute;
  left: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
  overflow-y: auto;
  background-color: white;
  user-select: none;
  animation-name: dropdown-open;
  animation-duration: .25s;

  @keyframes dropdown-open {
    from {
      max-height: 100%;
    } 

    to {
      max-height: 500%:
    }
  }
`;

const List = styled.div`
  width: 100%;
  height: auto;
`;

const ListItem = styled.div<{ $height: string, }>`
  width: 100%;
  height: ${({ $height }) => $height};
  line-height: ${({ $height }) => $height};
  font-size: .75rem;
  text-indent: .5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

/**
 * @param width 단위까지 포함한 width. 생략하면 100%
 * @param height 단위까지 포함한 height 값
 * @param values 리스트에 보여질 아이템 리스트. 문자열 배열로 전달
 * @param selectedIdx 현재 선택된 아이템의 인덱스
 * @param onChange 리스트에서 아이템을 선택했을 때 호출되는 함수
 * @returns 
 */
export default function Dropdown({
  width,
  height,
  values,
  selectedIdx,
  onChange,
}: DropdownProps) {
  const [isListOpen, setListOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setListOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [])

  const onInputClick = () => {
    setListOpen(!isListOpen);
  }

  const handleItemClick = useCallback((idx: number) => {
    setListOpen(false);
    onChange(idx);
  }, [onChange]);

  return (
    <Container $width={width} $height={height} ref={dropdownRef}>
      <Input $height={height} onClick={onInputClick}>
        {values[selectedIdx]}
        <IconWrapper $height={height}><Icon path={mdiChevronDown} /></IconWrapper>
      </Input>
      
      {isListOpen && (
        <ListWrapper>
          <List>
            {values.map((value, i) => (
              <ListItem key={`li-${i}`} $height={height} onClick={() => handleItemClick(i)}>
                {value}
              </ListItem>
            ))}
          </List>
        </ListWrapper>
      )}
    </Container>
  )
}