import styled from 'styled-components';

const CategoryNameContainer = styled.div`
  width: 100%;
  border: 1px solid gray;
`;

type CategoryNameProps = {
  name: string;
  color: string;
};

export default function CategoryName({ name, color }: CategoryNameProps) {
  return <CategoryNameContainer>{name}</CategoryNameContainer>;
}
