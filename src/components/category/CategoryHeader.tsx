import styled from 'styled-components';
import Monthly from '../common/Monthly';
import ControlButton from '../common/ControlButton';

const CategoryHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  max-width: 50rem;
`;

const CategoryHeaderTitle = styled.h2`
  font-size: 18px;
`;

const CategoryHeaderButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SAVE = '저장';
const CANCEL = '취소';
const CATEGORY_HEADER_TITLE = '카테고리 관리';

type CategoryHeaderProps = {
  saveHandler: () => void;
  cancelHandler: () => void;
};
export default function CategoryHeader({
  saveHandler,
  cancelHandler,
}: CategoryHeaderProps) {
  return (
    <CategoryHeaderContainer>
      <CategoryHeaderTitle>{CATEGORY_HEADER_TITLE}</CategoryHeaderTitle>
      <Monthly />
      <CategoryHeaderButtons>
        <ControlButton onClick={saveHandler} title={SAVE} />
        <ControlButton onClick={cancelHandler} title={CANCEL} />
      </CategoryHeaderButtons>
    </CategoryHeaderContainer>
  );
}
