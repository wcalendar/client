import BottomSheet from "@/components/common/bottom-sheet/BottomSheet";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  argTypes: {
    menus: {
      table: {
        disable: true,
      }
    },
    buttons: {
      table: {
        disable: true,
      }
    },
    children: {
      table: {
        disable: true,
      }
    },
  }
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'BottomSheet',
    menus: [{ label: '아이템', icon: 'move', onClick: () => {} }, { label: '아이템', icon: 'move', warning: true, onClick: () => {} }],
    buttons: [{ label: '저장', type: 'primary', onClick: () => {} }, { label: '취소', type: 'white', onClick: () => {} }],
    children: <>BODY</>,
  }
};