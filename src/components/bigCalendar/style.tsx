import styled from "styled-components";

export const BigCalendarContainer = styled.div`
  padding: 24px;

  .rbc-calendar {
    border-radius:12px;
    overflow: hidden;
    >div {
      border: none;
    }
  }

.rbc-month-header {
  height: 48px;
  background: #F2F2F2;
  

  .rbc-header  {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.rbc-date-cell {
  text-align: left;
}
.rbc-off-range-bg {
  background: transparent
}
`