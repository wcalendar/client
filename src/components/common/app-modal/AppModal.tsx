'use client';

import ScheduleModal from "../schedule-modal/ScheduleModal";
import NewScheduleModal from "@/components/common/new-schedule-modal/NewScheduleModal";
import { useContext } from "react";
import { ModalContext } from "@/providers/ModalProvider/ModalContext";
import SearchModal from "../search-modal/SearchModal";
import TutorialModal from "../tutorial-modal/TutorialModal";

const modalMap = {
  schedule: ScheduleModal,
  newSchedule: NewScheduleModal,
  search: SearchModal,
  tutorial: TutorialModal,
}

export default function AppModal() {
  const { modals } = useContext(ModalContext);

  return (
    <>
      {modals.map(modalKey => {
        const { key, modalProps } = modalKey;

        if(key === 'schedule') {
          // TODO 변수명 수정
          const ScheduleModals = modalMap[key];
          // TODO key 수정
          return <ScheduleModals key={'modal'} {...modalProps}></ScheduleModals>

        } else if(key === 'newSchedule') {
          const NewScheduleModals = modalMap[key];
          return <NewScheduleModals key={'modal'} {...modalProps}></NewScheduleModals>

        } else if(key === 'search') {
          const SearchModals = modalMap[key];
          return <SearchModals key={'modal'} {...modalProps}></SearchModals>
          
        } else if(key === 'tutorial') {
          const TutorialModal = modalMap[key];
          return <TutorialModal key={'modal'} {...modalProps}></TutorialModal>
          
        }
      })}
    </>
  )
}