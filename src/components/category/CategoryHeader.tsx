import styled from 'styled-components';
import Monthly from '../common/Monthly';
import ControlButton from '../common/ControlButton';
import { useRouter } from 'next/navigation';

const CategoryHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  max-width: 50rem;
`;

const SAVE = '저장';
const CANCEL = '취소';

export default function CategoryHeader() {
  const router = useRouter();

  //   TODO
  const onSaveHandler = () => {
    router.push('/');
  };

  //   TODO
  const onCancelHandler = () => {
    router.push('/');
  };

  return (
    <CategoryHeaderContainer>
      <h2>카테고리 관리</h2>
      <Monthly />
      <div>
        <ControlButton onClick={onSaveHandler} title={SAVE} />
        <ControlButton onClick={onCancelHandler} title={CANCEL} />
      </div>
    </CategoryHeaderContainer>
  );
}
