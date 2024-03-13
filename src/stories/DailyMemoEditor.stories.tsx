import DailyMemoEditor from "@/components/calendar/daily-memo-sheet/DailyMemoEditor";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';

const meta = {
  title: 'Components/DailyMemoEditor',
  component: DailyMemoEditor,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DailyMemoEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: ''
  },
  /* eslint-disable */
  render: (args) => {
    const [{value}, updateArgs] = useArgs<{ value: string }>();

    const handleChange = (value: string) => {
      updateArgs({ value });
    };

    return <div style={{height: '20rem'}}><DailyMemoEditor value={value} onChange={handleChange} /></div>;
  },
  /* eslint-enable */
};