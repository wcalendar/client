import styled from "styled-components";

export const BigCalendarContainer = styled.div`
  padding: 24px;

  .fc-direction-ltr{ 
    border-radius: 12px;
    overflow: hidden
  }

  table {
    border-radius:12px;
  }

  thead {
    height: 48px;

    thead {
      background-color: #0000000D;
      th {
        > div {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center
        }
      }
    }

    .fc-day-sun {
      a {
        color: #E12B36;
      }
    }

    .fc-day-sat {
      a {
        color: #5483FD;
      }
    }

  }

  tbody {

    td {
      > div {
        padding: 8px;
      }
    }


  }
  .fc-day-today {
    /* background-color: green !important; */
  }
  
  .fc-col-header-cell.fc-day {
    /* background: green; */
  }

  .fc .fc-daygrid-day-top {
    flex-direction: initial;
  }
`
