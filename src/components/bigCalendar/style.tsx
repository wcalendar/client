import styled from "styled-components";

export const BigCalendarContainer = styled.div`
  padding: 24px;
  position: relative;

  /* TODO: height 설정 필요  */
  .fc-direction-ltr{ 
    border-radius: 12px;
    overflow: hidden
  }

  .fc-theme-standard .fc-scrollgrid {
    border: unset;
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
          justify-content: center;
          
          a {
            font-weight: 400;
            font-size: 18px;
            color: #000000CC;
          }
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

  .fc .fc-daygrid-day.fc-day-today {
    background-color: transparent !important;

    .fc-daygrid-day-top {
      > a {
        a {
          width: 24px;
          height: 24px;
          background: #5483FD;
          color: white;
          border-radius: 50%;
        }
      
      }
    }
  }
  

  .fc .fc-daygrid-day-top {
    flex-direction: initial;
  }
`

export const AddEventButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #5483FD;
  position: absolute;
  bottom: 8px;
  right: 8px;
`
