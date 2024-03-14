// import moment from 'moment';
// import 'moment/locale/ko';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// import { BigCalendarContainer } from './style';


// // 한국어로 요일을 변경
// moment.locale('ko');

// const localizer = momentLocalizer(moment);
// console.log(localizer)
// const BigCalendar = () => {
//   return (
//     <BigCalendarContainer>
//       <Calendar
//         localizer={localizer}
//         // events={myEventsList}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//         toolbar={false}
        
//       />
//     </BigCalendarContainer>
//   )
// }

// export default BigCalendar;


import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import FullCalendar from '@fullcalendar/react';
import { BigCalendarContainer } from './style';

export default function Calendar() {
  const removeDayContent = (info : any) => {
    const number = document.createElement('a')
    number.classList.add('fc-daygrid-day-number')
    number.innerHTML = info.dayNumberText.replace("일", "");
    if (info.view.type === 'dayGridMonth') {
      return {
        html:number.outerHTML
      }
    }
  }
  return (
    <BigCalendarContainer>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        headerToolbar={false}
        locale={'ko'}
        dayCellContent={removeDayContent}
      />  
    </BigCalendarContainer>
  )
}