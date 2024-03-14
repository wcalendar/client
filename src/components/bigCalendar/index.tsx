import moment from 'moment';
import 'moment/locale/ko';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BigCalendarContainer } from './style';

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  return (
    <BigCalendarContainer>
      <Calendar
        localizer={localizer}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        toolbar={false}
      />
    </BigCalendarContainer>
  )
}

export default BigCalendar;
