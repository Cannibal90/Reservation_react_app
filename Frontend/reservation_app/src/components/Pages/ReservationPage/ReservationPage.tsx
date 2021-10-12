import React, { useState } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  TodayButton,
  DateNavigator,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Modal, Paper } from "@mui/material";
import AppointmentFormLayer from "../../AppointmentFormLayer/AppointmentFormLayer";
import "./ReservationPage.css";

const ReservationPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reservationStartDate, setReservationStartDate] = useState<Date>();
  const [reservationEndDate, setReservationEndDate] = useState<Date>();
  const [reservationId, setReservationId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const closeDrawer = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };
  const openDrawer = () => {
    setOpen(true);
  };

  const schedulerData = [
    {
      id: 1,
      startDate: "2021-10-10T09:45",
      endDate: "2021-10-10T11:00",
    },
    {
      id: 2,
      startDate: "2021-10-10T12:00",
      endDate: "2021-10-10T13:30",
    },
  ];

  const onIdChange = (value: any) => {
    setReservationId(value);
  };

  const onReservationDelete = (value: any) => {
    //serwis i usuwanie
  };

  const TimeTableCell = ({ onDoubleClick, ...restProps }: any) => {
    return (
      <DayView.TimeTableCell
        onClick={() => {
          setReservationStartDate(restProps.startDate);
          setReservationEndDate(restProps.endDate);
          openDrawer();
        }}
        {...restProps}
      />
    );
  };

  const toolTip = ({
    onOpenButtonClick,
    onDeleteButtonClick,
    ...restProps
  }: any) => {
    return (
      <AppointmentTooltip.Header
        onOpenButtonClick={() => {
          setReservationStartDate(restProps.appointmentData.startDate);
          setReservationEndDate(restProps.appointmentData.endDate);
          setReservationId(restProps.appointmentData.id);
          openDrawer();
        }}
        onDeleteButtonClick={() => {
          onReservationDelete(restProps.appointmentData.id);
        }}
        {...restProps}
      />
    );
  };

  const onSelectedDateChange = (value: any) => {
    setSelectedDate(value);
  };

  return (
    <Paper className="reservationContainer">
      <Scheduler data={schedulerData}>
        <ViewState
          currentDate={selectedDate}
          defaultCurrentDate={selectedDate}
          onCurrentDateChange={onSelectedDateChange}
          defaultCurrentViewName="Day"
        />
        <DayView
          startDayHour={8}
          endDayHour={18}
          timeTableCellComponent={TimeTableCell}
        />
        <WeekView
          startDayHour={8}
          endDayHour={18}
          timeTableCellComponent={TimeTableCell}
        />

        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />

        <Appointments />
        <AppointmentTooltip
          showOpenButton
          showDeleteButton
          headerComponent={toolTip}
        />

        <Modal open={open} onClose={closeDrawer}>
          <Paper className="pop-up">
            <AppointmentFormLayer
              startDate={reservationStartDate}
              endDate={reservationEndDate}
              id={reservationId}
              onChange={onIdChange}
            />
          </Paper>
        </Modal>
      </Scheduler>
    </Paper>
  );
};

export default ReservationPage;
