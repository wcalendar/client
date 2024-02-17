import useDev from "@/hooks/useDev";
import useExceptionPopup from "@/hooks/useExceptionPopup";
import { apis } from "@/lib/apis";
import time from "@/lib/time";
import { CategoryToRender, ErrorRes, Priority, ScheduleModalInfo } from "@/types";
import { AxiosError } from "axios";
import { Dispatch, DragEvent, MouseEvent, SetStateAction, useCallback, useState } from "react";

export default function usePriorities(
  categoryToRenderList: CategoryToRender[],
  prioritiesByDay: Priority[][],
  setPrioritiesByDay: Dispatch<SetStateAction<Priority[][]>>,
  handleScheduleClick: (newScheduleModalInfo: ScheduleModalInfo) => void,
) {
  const { isDev } = useDev();
  const openExceptionPopup = useExceptionPopup();

  const [draggedPriority, setDraggedPriority] = useState<Priority | null>(null);
  const [draggedPriorityX, setDraggedPriorityX] = useState(0);
  const [draggedPriorityY, setDraggedPriorityY] = useState(0);
  const [openedDay, setOpenedDay] = useState(0);

  const handlePriorityListOpen = useCallback((day: number) => {
    setOpenedDay(day);
  }, []);

  const handlePriorityClick = useCallback((e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, categoryId: string, groupCode: string) => {
    const category = categoryToRenderList.find(c => c.category.id === categoryId)?.category;
    if(!category) {
      alert('존재하지 않는 일정입니다.');
      return;
    }

    const schedule = category.schedules.find(s => s.groupCode === groupCode);
    if(!schedule) {
      alert('존재하지 않는 일정입니다.');
      return;
    }

    const newScheduleModalInfo: ScheduleModalInfo = {
      x: e.clientX,
      y: e.clientY,
      schedule,
    };

    handleScheduleClick(newScheduleModalInfo);
  }, [categoryToRenderList, handleScheduleClick]);
  
  const handlePriorityItemDrag = useCallback((newX: number, newY: number, priority: Priority) => {
    if(!draggedPriority) setDraggedPriority(priority);
    setDraggedPriorityX(newX);
    setDraggedPriorityY(newY);
  }, [draggedPriority]);
  
  const handlePriorityItemDragEnd = useCallback((e?: DragEvent<HTMLDivElement>) => {
    setDraggedPriority(null);

    const dragImage = document.getElementById('drag-image');
    if(dragImage) {
      dragImage.remove();
    }
  }, []);

  const updatePriority = useCallback(async (scheduleOrderList: string[], scheduleDate: string) => {
    if(isDev()) return;

    try {
      const response = await apis.updateSchedulePriority(scheduleOrderList, scheduleDate);
    } catch(e) {
      const error = e as AxiosError<any>;
      openExceptionPopup(error);
    }
  }, []);

  const handlePriorityItemDrop = useCallback((day: number, draggableIdx: number, droppableIdx: number) => {
    const newPrioritiesByDay = [...prioritiesByDay];
    const priorities = newPrioritiesByDay[day];

    const targetIdx = droppableIdx > draggableIdx ? droppableIdx-1 : droppableIdx;
    if(draggableIdx < targetIdx) {
      priorities[draggableIdx].priority = targetIdx;

      for(let i=draggableIdx+1; i<=targetIdx; i++) {
        (priorities[i].priority)--;
      }
    } else if(draggableIdx > targetIdx) {
      priorities[draggableIdx].priority = targetIdx;

      for(let i=targetIdx; i<draggableIdx; i++) {
        (priorities[i].priority)++;
      }
    } else return;

    priorities.sort((a, b) => a.priority - b.priority);

    setPrioritiesByDay(newPrioritiesByDay);

    const scheduleOrderList = priorities.map(priority => priority.scheduleId);
    const scheduleDate = time.toString(priorities[0].date, 'YYYY-MM-DD');

    updatePriority(scheduleOrderList, scheduleDate);

    handlePriorityItemDragEnd();
  }, [prioritiesByDay]);

  return {
    draggedPriorityX, draggedPriorityY, draggedPriority, openedDay,
    handlePriorityListOpen,
    handlePriorityClick,
    handlePriorityItemDrag,
    handlePriorityItemDragEnd,
    handlePriorityItemDrop,
  };
}