import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const CategorySettingContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.white};
`;

const CategorySettingButton = styled.button`
  padding: 5px 10px;
  border: none;
  color: white;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
`;

const CATEGORY_PAGE = 'category';
const CATEGORY_BUTTON = '카테고리 관리';

export default function CategorySetting() {
  const router = useRouter();

  const goCategorySetting = () => {
    router.push(`/${CATEGORY_PAGE}`);
  };

  return (
    <CategorySettingContainer>
      <CategorySettingButton onClick={goCategorySetting}>
        {CATEGORY_BUTTON}
      </CategorySettingButton>
    </CategorySettingContainer>
  );
}
