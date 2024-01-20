'use client';

import ScheduleModal from "../schedule-modal/ScheduleModal";
import CategoryModal from "../category-modal/CategoryModal";
import NewScheduleModal from "@/app/NewScheduleModal";
import { useContext } from "react";
import { ModalContext } from "@/providers/ModalProvider/ModalContext";
import SearchModal from "../search-modal/SearchModal";

const modalMap = {
  schedule: ScheduleModal,
  category: CategoryModal,
  newSchedule: NewScheduleModal,
  search: SearchModal,
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

        } else if(key === 'category') {
          const CategoryModals = modalMap[key];
          return <CategoryModals key={'modal'} {...modalProps}></CategoryModals>

        } else if(key === 'newSchedule') {
          const NewScheduleModals = modalMap[key];
          return <NewScheduleModals key={'modal'} {...modalProps}></NewScheduleModals>

        } else if(key === 'search') {
          const SearchModals = modalMap[key];
          return <SearchModals key={'modal'} {...modalProps}></SearchModals>
          
        }
      })}
    </>
  )
}