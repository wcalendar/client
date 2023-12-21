import { RiSearchLine } from 'react-icons/ri';
import styled from 'styled-components';

const SearchBarContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export default function SearchBar() {
  return (
    <SearchBarContainer>
      <input />
      <button>
        <RiSearchLine size={24} />
      </button>
    </SearchBarContainer>
  );
}
