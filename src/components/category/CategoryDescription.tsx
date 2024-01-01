import styled from 'styled-components';

const CategoryDescriptionContainer = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
`;

type CategoryDescriptionProps = {
  description: string;
  color: string;
};

export default function CategoryDescription({
  description,
  color,
}: CategoryDescriptionProps) {
  return (
    <CategoryDescriptionContainer color={color}>
      <span>{description}</span>
    </CategoryDescriptionContainer>
  );
}
