import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { AddEventButton, BigCalendarContainer } from './style';

export default function Calendar() {
  const removeDayContent = (info : any) => {
      const number = document.createElement('a');
      number.classList.add('fc-daygrid-day-number');
      const dayNumber = parseInt(info.dayNumberText.replace("일", ""));
      const formattedDayNumber = dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
      number.innerHTML = formattedDayNumber;
      if (info.view.type === 'dayGridMonth') {
          return {
            html: number.outerHTML
          };
      }
  };

  return (
    <BigCalendarContainer>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        headerToolbar={false}
        locale={'ko'}
        dayCellContent={removeDayContent}
        editable={true}
        dayHeaderFormat={{ weekday: 'long' }} 
        height="auto"
      />  
      {/* TODO: 추후 컴포넌트 교체 */}
      <AddEventButton />
    </BigCalendarContainer>
  )
}