import styled from "styled-components";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Container = styled.div`
  height: 100%;

  .quill {
    height: 100%;
  }

  .ql-toolbar {
    border: 1px solid ${({ theme }) => `${theme.colors.black}33`};
    border-radius: .75rem .75rem 0 0;
  }

  .ql-container {
    height: 100%;
    border: 1px solid ${({ theme }) => `${theme.colors.black}33`};
    border-radius: 0 0 .75rem .75rem;
  }

  .ql-editor {
    font-size: .9375rem;
  }
`;

interface DailyMemoEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const modules = {
  toolbar: [
    [{ align: [] }, { color: [] },], 
    ['bold', 'italic', 'underline', 'strike', 'code-block', 'clean'],
  ],
};

export default function DailyMemoEditor({
  value,
  onChange,
}: DailyMemoEditorProps) {
  return (
    <Container>
      <ReactQuill theme='snow' value={value} onChange={onChange} modules={modules} />
    </Container>
  )
}