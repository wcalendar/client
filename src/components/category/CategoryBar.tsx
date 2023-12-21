import styled from 'styled-components';
import CategorySetting from './CategorySetting';
import CategoryList from './CategoryList';
import Priority from './Priority';

const CategoryBarContainer = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default function CategoryBar() {
  return (
    <CategoryBarContainer>
      <CategorySetting />
      <Priority />
      <CategoryList />
    </CategoryBarContainer>
  );
}
