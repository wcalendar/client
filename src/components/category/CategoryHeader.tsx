import styled from 'styled-components';
import Monthly from '../common/Monthly';
import ControlButton from '../common/ControlButton';

const CategoryHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const CategoryHeaderContentsContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 5px;
  max-width: 1000px;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
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
      <CategoryHeaderContentsContainer>
        <CategoryHeaderTitle>{CATEGORY_HEADER_TITLE}</CategoryHeaderTitle>
        <Monthly />
        <CategoryHeaderButtons>
          <ControlButton onClick={saveHandler} title={SAVE} />
          <ControlButton onClick={cancelHandler} title={CANCEL} />
        </CategoryHeaderButtons>
      </CategoryHeaderContentsContainer>
    </CategoryHeaderContainer>
  );
}
