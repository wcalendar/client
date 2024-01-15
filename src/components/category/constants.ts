export const ButtonText = {
  viewAll: '카테고리 모두 보기',
  add: '추가',
  delete: '삭제',
  save: '저장',
  cancel: '취소',
  addLevelOne: '+ 1단계 카테고리 추가'
} as const;

export const LabelText = {
  pageTitle: '카테고리 관리',
  title: '제목',
  description: '비고',
  isVisible: '표시 여부',
  color: '범주',
  descriptionPlaceHolder: '카테고리 관련 메모 입력(마감일, 주기 등)',
  show: '표시',
  hide: '숨기기',
} as const;

export const InputMaxLength = 20;

export const HelperText: string[] = [
  '카테고리 이동은 카테고리 그룹 순서 이동만 가능합니다.',
  '1단계 카테고리는 총 10개까지 생성 가능합니다.',
  '각각의 하위 카테고리는 총 10개까지 생성 가능합니다.',
  '카테고리는 3단계까지 생성 가능합니다.',
  '카테고리 제목과 일정은 수정 시, 전 기간에 반영됩니다.',
  '카테고리 추가/삭제는 해당 월부터 반영됩니다.',
];
