import styled from 'styled-components';
import CategoryItem from './CategoryItem';
import theme from '@/style/Theme';

const CategoryListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const categories = [
  {
    title: 'test1',
    period: '23.12-24.01',
    theme: theme.colors.categoryMainRed,
    type: 'Main',
  },
  {
    title: 'test1-1',
    period: '23.12-24.01',
    theme: theme.colors.categoryMainRed,
    type: 'Sub',
  },
  {
    title: 'test2',
    period: '23.12-24.01',
    theme: theme.colors.categoryMainOrange,
    type: 'Main',
  },
  {
    title: 'test3',
    period: '23.12-24.01',
    theme: theme.colors.categoryMainYellow,
    type: 'Main',
  },
  {
    title: 'test4',
    period: '23.12-24.01',
    theme: theme.colors.categoryMainGreen,
    type: 'Main',
  },
  {
    title: 'test5',
    period: '23.12-24.01',
    theme: theme.colors.categoryMainBlue,
    type: 'Main',
  },
];

export default function CategoryList() {
  return (
    <CategoryListContainer>
      {categories.map(item => (
        <CategoryItem
          key={item.title}
          title={item.title}
          period={item.period}
          theme={item.theme}
          type={item.type}
        />
      ))}
    </CategoryListContainer>
  );
}
