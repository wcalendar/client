import Popup from "@/components/common/new-popup/Popup";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: 'Components/Popup',
  component: Popup,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  argTypes: {},
} satisfies Meta<typeof Popup>

export default meta;
type Story = StoryObj<typeof meta>

export const OneButton: Story = {
  args: {
    popupInfo: {
      title: '팝업',
      description: '팝업입니다',
      buttons: [{ label: '버튼', onClick: () => {}, type: 'primary' }],
    },
  },
}

export const TwoButton: Story = {
  args: {
    popupInfo: {
      title: '팝업',
      description: '팝업입니다',
      buttons: [{ label: '버튼', onClick: () => {}, type: 'cancel' }, { label: '버튼', onClick: () => {}, type: 'primary' }],
    },
  },
}