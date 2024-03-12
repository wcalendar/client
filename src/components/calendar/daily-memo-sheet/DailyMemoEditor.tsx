import styled from "styled-components";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import('react-quill'));

const Container = styled.div`
  height: 100%;

  .quill {
    height: 100%;
  }

  .ql-toolbar {
    height: 2.75rem;
    border: 1px solid ${({ theme }) => `${theme.colors.black}33`};
    border-radius: .75rem .75rem 0 0;
    padding: .5625rem .5rem;
  }

  .ql-toolbar .ql-formats {
    margin-right: 5px;
  }

  .ql-toolbar button {
    width: 24px;
    padding: 3px 3px;
  }

  .ql-toolbar button:hover, ql-toolbar button:focus, .ql-toolbar button.ql-active,
  .ql-toolbar .ql-picker-label:hover, .ql-toolbar .ql-picker-label.ql-active,
  .ql-toolbar .ql-picker-item:hover, .ql-toolbar .ql-picker-item.ql-selected {
    color: ${({ theme }) => theme.colors.primary};
  }

  .ql-container {
    height: calc(100% - 2.75rem);
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