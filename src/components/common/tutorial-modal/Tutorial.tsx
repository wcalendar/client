import { useCallback, useState } from "react";
import styled from "styled-components";
import CloseButtonIcon from "@/assets/close_btn.svg";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import Image from "next/image";
import useDevice from "@/hooks/useDevice";

const Container = styled.div`
  padding: 1.25rem;
  user-select: none;
  height: 100%;

  --image-size: 21rem;

  @media ${({ theme }) => theme.devices.mobile} {
    --image-size: 16.25rem;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

 const Body = styled.div`
  width: 100%;
  height: calc(100% - 1.5rem);
  overflow: hidden;
  overflow-y: auto;
 `;

const SlideBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const SlideButton = styled.button`
  flex-basis: 1.5rem;
  flex-shrink: 0;
  flex-grow: 0;
  height: 1.5rem;
  cursor: pointer;
`;

const SlideContent = styled.div`
  flex-grow: 1;
`;

const SlideTitle = styled.h1`
  width: 100%;
  font-size: 1.25rem;
  line-height: 1.5rem;
  text-align: center;
  margin-bottom: .75rem;
`;

const SlideDescription = styled.p`
  width: 100%;
  min-height: 2.5rem;
  line-height: 1.25rem;
  font-size: .875rem;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 1.875rem;
  text-align: center;

  strong {
    color: inherit;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    min-height: 3.75rem;
  }
`;

const SlideImageBox = styled.div`
  position: relative;
  margin: 0 auto;
  width: var(--image-size);
  height: var(--image-size);
  overflow: hidden;
  margin-bottom: 1.25rem;
  border-radius: 20px;
`;

const SlideImageContent = styled.div<{ page: number }>`
  position: absolute;
  left: calc(var(--image-size) * ${({ page }) => -page});
  top: 0;
  display: flex;
  width: calc(var(--image-size) * 5);
  height: 100%;
  transition: left ease .25s;
`;

const SlideImageWrapper = styled.div`
  position: relative;
  width: var(--image-size);
  height: 100%:
`;

const PaginationBox = styled.div`
  width: 100%;
  display: flex;
  height: .5rem;
  justify-content: space-between;
  align-items: center;

  @media ${({ theme }) => theme.devices.mobile} {
    height: 1.5rem;
  }
`;

const Pagination = styled.div`
  width: 100%;
  height: .5rem;
  display: flex;
  justify-content: center;
  gap: .5rem;
`;

const Page = styled.div.withConfig({
  shouldForwardProp: p => !['currentPage'].includes(p),
})<{ currentPage: number }>`
  width: .5rem;
  height: .5rem;
  border-radius: .5rem;
  transition: background-color ease .25s;
  background-color: ${({ theme, currentPage }) => `${theme.colors.black}${currentPage ? '' : '20'}`};
`;

const DesktopBr = styled.br`
  @media ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;

const MobileBr = styled.br`
  display: none;

  @media ${({ theme }) => theme.devices.mobile} {
    display: inline;
  }
`;

const tutorialInfos = [
  {
    title: (<>W Planner는 <MobileBr />업무 관리 플래너 예요.</>),
    description: (<>카테고리와 업무 우선순위를 통해 <MobileBr />복잡한 업무를 쉽게 관리해 보세요.</>),
  },
  {
    title: (<>고정 행에서 <MobileBr />업무 우선순위를 확인해요.</>),
    description: (<><strong>고정 행</strong>에서는 <strong>업무의 우선순위</strong>가 <MobileBr />표시됩니다. <DesktopBr />순위는 드래그 & 드랍을 통해 <MobileBr/>변경 가능해요.</>),
  },
  {
    title: (<>고정 열에서 <MobileBr />카테고리를 확인해요.</>),
    description: (<><strong>고정 열</strong>에서는 <strong>카테고리</strong>가 표시됩니다. <DesktopBr /><MobileBr />카테고리 관리 버튼을 누르면 <MobileBr />카테고리를 수정, 추가할 수 있어요.</>),
  },
  {
    title: (<>업무를 카테고리별로 <MobileBr />분류해 관리해요.</>),
    description: (<><strong>카테고리 관리 페이지</strong>에서 업무를 카테고리별<MobileBr />로 분류할 수 있습니다. <DesktopBr />2단계, 3단계의 하위 <MobileBr />카테고리로 업무를 세분화 시켜 관리하세요.</>),
  },
  {
    title: (<>일정 추가는 <MobileBr />두가지 방법으로 할 수 있어요.</>),
    description: (<>우측 하단의 + 버튼을 통해 일정을 <MobileBr />추가하거나, <DesktopBr />표 위에 마우스를 올려 <MobileBr />추가할 수 있어요.</>),
  },
];

interface TutorialProps {
  onClose: () => void;
}

export default function Tutorial({
  onClose,
}: TutorialProps) {
  const device = useDevice();
  const [page, setPage] = useState(0);

  const handlePrevClick = useCallback(() => {
    if(page > 0) setPage(page - 1);
  }, [page]);

  const handleNextClick = useCallback(() => {
    if(page < 4) setPage(page + 1);
  }, [page]);

  return (
    <Container>
      <Header>
        <CloseButton onClick={onClose}>
          <CloseButtonIcon width="100%" height='100%' />
        </CloseButton>
      </Header>
      <Body>
        <SlideBox>
          {device !== 'mobile' && (
            <SlideButton onClick={handlePrevClick}>
              <Icon path={mdiChevronLeft} />
            </SlideButton>
          )}
          <SlideContent>
            <SlideTitle>{tutorialInfos[page].title}</SlideTitle>
            <SlideDescription>{tutorialInfos[page].description}</SlideDescription>
            <SlideImageBox>
              <SlideImageContent page={page}>
                <SlideImageWrapper><Image src="/images/tutorial_image_1.png" alt="tutorial_image_1" fill/></SlideImageWrapper>
                <SlideImageWrapper><Image src="/images/tutorial_image_2.png" alt="tutorial_image_2" fill/></SlideImageWrapper>
                <SlideImageWrapper><Image src="/images/tutorial_image_3.png" alt="tutorial_image_3" fill/></SlideImageWrapper>
                <SlideImageWrapper><Image src="/images/tutorial_image_4.png" alt="tutorial_image_4" fill/></SlideImageWrapper>
                <SlideImageWrapper><Image src="/images/tutorial_image_5.png" alt="tutorial_image_5" fill/></SlideImageWrapper>
              </SlideImageContent>
            </SlideImageBox>
            <PaginationBox>
              {device === 'mobile' && (
                <SlideButton onClick={handlePrevClick}>
                  <Icon path={mdiChevronLeft} />
                </SlideButton>
              )}
              <Pagination>
                <Page currentPage={page === 0 ? 1 : 0} />
                <Page currentPage={page === 1 ? 1 : 0} />
                <Page currentPage={page === 2 ? 1 : 0} />
                <Page currentPage={page === 3 ? 1 : 0} />
                <Page currentPage={page === 4 ? 1 : 0} />
              </Pagination>
              {device === 'mobile' && (
                <SlideButton onClick={handleNextClick}>
                  <Icon path={mdiChevronRight} />
                </SlideButton>
              )}
            </PaginationBox>
          </SlideContent>
          {device !== 'mobile' && (
            <SlideButton onClick={handleNextClick}>
              <Icon path={mdiChevronRight} />
            </SlideButton>
          )}
        </SlideBox>
      </Body>
    </Container>
  );
}