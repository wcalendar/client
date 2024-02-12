import styled from 'styled-components';

const tips: string[] = [
  '카테고리 이동은 카테고리 그룹 순서 이동만 가능합니다.',
  '1단계 카테고리는 총 10개까지 생성 가능합니다.',
  '각각의 하위 카테고리는 총 10개까지 생성 가능합니다.',
  '카테고리는 3단계까지 생성 가능합니다.',
  '카테고리 추가/삭제는 해당 월부터 반영됩니다.',
];

export default function Tips() {
  return (
    <Container>
      {tips.map(text => (
        <li key={text}>{text}</li>
      ))}
    </Container>
  );
}

const Container = styled.ul`
  font-size: .75rem;
  gap: 0.5rem;
  padding: 1rem;
`;