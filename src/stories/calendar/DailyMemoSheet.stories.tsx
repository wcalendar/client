import DailyMemoSheet from "@/components/common/daily-memo-editor/DailyMemoSheet";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: 'Components/Calendar/DailyMemoSheet',
  component: DailyMemoSheet,
} satisfies Meta<typeof DailyMemoSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    /* eslint-disable */
    render: (args) => {
      return <div style={{height: '20rem'}}><DailyMemoSheet {...args} /></div>;
    },
    /* eslint-enable */
};