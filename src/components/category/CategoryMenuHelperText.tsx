import styled from 'styled-components';
import { HelperText } from './constants';

export default function CategoryMenuHelperText() {
  return (
    <CategoryHelperTextContainer>
      {HelperText.map(text => (
        <li key={text}>{text}</li>
      ))}
    </CategoryHelperTextContainer>
  );
}

const CategoryHelperTextContainer = styled.ul`
  font-size: 12px;
  gap: 0.5rem;
  padding: 1rem;
`;