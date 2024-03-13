import Svgs from "@/assets/Svgs";
import { ModalStatus } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div.withConfig({
  shouldForwardProp: p => !['width'].includes(p),
})<{ width: string }>`
  width: ${({ width }) => width};
  min-height: 2.5rem;
  position: relative;
`;

const Input = styled.div.withConfig({
  shouldForwardProp: p => !['disabled'].includes(p),
})<{ disabled: boolean }>`
  display: flex;
  gap: .25rem;
  align-items: center;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.black20};
  border-radius: .5rem;
  padding: 0 .5rem;
  cursor: pointer;
  background-color: ${({ theme, disabled }) => disabled ? theme.colors.black05 : theme.colors.white};
`;

const Text = styled.div.withConfig({
  shouldForwardProp: p => !['notSelected'].includes(p),
})<{ notSelected: boolean }>`
  flex-grow: 1;
  font-size: .9375rem;
  color: ${({ theme, notSelected }) => notSelected ? theme.colors.black50 : theme.colors.black };
  user-select: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const IconWrapper = styled.div`
  flex: 1.5rem 0 0;
  height: 1.5rem;

  path {
    fill: ${({ theme }) => theme.colors.black50};
  }
`;

const ListBox = styled.div.withConfig({
  shouldForwardProp: p => !['status'].includes(p),
})<{ status: ModalStatus }>`
  position: absolute;
  top: 3rem;
  width: 100%;
  height: auto;
  max-height: 14rem;
  transform: ${({ status }) => status === 'open' ? 'translateY(0)' : 'translateY(-10%)'} ;
  opacity: ${({ status }) => status === 'open' ? '1' : '0'};
  animation: ${({ status }) => status === 'open' ? 'fromUpOpen' : 'fromUpClose'} .25s;
  padding: .75rem 0;
  border: 1px solid ${({ theme }) => theme.colors.black20};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 4px 4px 12px 0 ${({ theme }) => theme.colors.black12};
  overflow-y: hidden;
`;

const ListWrapper = styled.div`
  max-height: 12.5rem;
  overflow-y: auto;
`;

const List = styled.div`

`;

const Item = styled.div`
  height: 2.5rem;
  padding: 0 .5rem;
  display: flex;
  gap: .25rem;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  transition: background-color .25s ease;

  &+& {
    border-top: 1px solid ${({ theme }) => theme.colors.black10};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.black05};
  }
`;

const ItemText = styled.div`
  flex-grow: 1;
  font-size: .9375rem;
  color: ${({ theme }) => theme.colors.black };
  user-select: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  margin-top: .25rem;
  font-size: .6875rem;
  color: ${({ theme }) => theme.colors.black50};
  user-select: none;
`;

interface DropdownProps {
  values: string[];
  selectedIdx: number | null;
  onChange: (selectedIdx: number) => void;
  width?: string;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
}

export default function Dropdown({
  values,
  selectedIdx,
  onChange,
  width = '100%',
  disabled,
  placeholder,
  description,
}: DropdownProps) {
  const notSelected = selectedIdx === null;

  const inputRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useRef<HTMLDivElement>(null);

  const [listStatus, setListStatus] = useState<ModalStatus>('closed');

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if(inputRef.current && !inputRef.current.contains(e.target as Node) && listBoxRef.current && !listBoxRef.current.contains(e.target as Node)) {
        setListStatus('closing');
      }
    }

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, []);

  const handleInputClick = useCallback(() => {
    if(!disabled) setListStatus('open');
  }, [disabled]);

  const handleListWrapperAnimationEnd = useCallback(() => {
    if(listStatus === 'closing') setListStatus('closed');
  }, [listStatus]);

  const handleItemClick = useCallback((idx: number) => {
    onChange(idx);
    setListStatus('closing');
  }, [onChange]);

  return (
    <Container width={width}>
      <Input ref={inputRef} disabled={Boolean(disabled)} onClick={handleInputClick}>
        <Text notSelected={notSelected}>{!notSelected ? values[selectedIdx] : placeholder}</Text>
        <IconWrapper><Svgs svgKey={listStatus === 'closed' ? 'arrowDown' : 'arrowUp'} /></IconWrapper>
      </Input>
      {listStatus !== 'closed' && (
        <ListBox ref={listBoxRef} status={listStatus} onAnimationEnd={handleListWrapperAnimationEnd}>
          <ListWrapper >
            <List>
              {values.map((value, i) => (
                <Item key={`dd-item-${value}`} onClick={() => handleItemClick(i)}>
                  <ItemText>
                    {value}
                  </ItemText>
                </Item>
              ))}
            </List>
          </ListWrapper>
        </ListBox>
      )}
      {description && (<Description>* {description}</Description>)}
    </Container>
  );
}