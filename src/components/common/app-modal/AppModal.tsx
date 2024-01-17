'use client';

import ScheduleModal from "../schedule-modal/ScheduleModal";
import CategoryModal from "../category-modal/CategoryModal";
import NewScheduleModal from "@/components/calendar/NewScheduleModal";
import { useContext } from "react";
import { ModalContext } from "@/providers/ModalContext";

const modalMap = {
  schedule: ScheduleModal,
  category: CategoryModal,
  newSchedule: NewScheduleModal,
}

export default function AppModal() {
  const { modals } = useContext(ModalContext);

  return (
    <>
      {modals.map(modalKey => {
        const { key, modalProps } = modalKey;

        if(key === 'schedule') {
          const Comp = modalMap[key];
          return <Comp {...modalProps}></Comp>
        } else if(key === 'category') {
          const Comp = modalMap[key];
          return <Comp {...modalProps}></Comp>
        } else if(key === 'newSchedule') {
          const Comp = modalMap[key];
          return <Comp {...modalProps}></Comp>
        }
      })}
    </>
  )
}