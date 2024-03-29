import React, { useState, useEffect } from "react";
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
import { ReservationService } from "../../../services/reservation/reservationService";
import { useParams } from "react-router";
import { SchedulerData } from "../../../models/ReservationInterfaces";

const ReservationPage = () => {
  const params = useParams() as any;
  const startDate = params.startDate ? new Date(params.startDate) : new Date();
  const endDate = params.endDate ? new Date(params.endDate) : new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(startDate);
  const [reservationStartDate, setReservationStartDate] =
    useState<Date>(startDate);
  const [reservationEndDate, setReservationEndDate] = useState<Date>(endDate);
  const [reservationId, setReservationId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [reloadParams, setReloadParams] = useState<boolean>(true);
  const [schedulerData, setSchedulerData] = useState<SchedulerData[]>();
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const reservationService = new ReservationService();

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

  const onSelectedDateChange = (value: any) => {
    setSelectedDate(value);
  };

  const onLoadingChange = () => {
    setLoading(!loading);
  };

  const onReservationDelete = (value: any) => {
    reservationService.deleteReservation(value).then(() => {
      onLoadingChange();
    });
  };

  const getAllReservationsForDesk = () => {
    reservationService.getReservationForStation(params.id).then((response) => {
      let newSchedulerData = response?.map((res) => {
        return {
          id: res.id,
          startDate: res.durration.beginning,
          endDate: res.durration.end,
          stationId: res.stationId,
        } as SchedulerData;
      });
      setSchedulerData(newSchedulerData);
    });
  };

  useEffect(() => {
    getAllReservationsForDesk();
  }, [loading]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (params.startDate && params.endDate && reloadParams) {
      let reservation = schedulerData?.filter(
        (data) =>
          new Date(data.startDate).getTime() ===
            reservationStartDate.getTime() &&
          new Date(data.endDate).getTime() === reservationEndDate.getTime()
      );

      if (reservation && reservation.length) {
        setReservationId(reservation[0].id);
        openDrawer();
      }
    }
  }, [schedulerData]); //eslint-disable-line react-hooks/exhaustive-deps

  const TimeTableCell = ({ onDoubleClick, ...restProps }: any) => {
    return (
      <DayView.TimeTableCell
        onClick={() => {
          setReservationStartDate(restProps.startDate);
          setReservationEndDate(restProps.endDate);
          setReservationId(0);
          openDrawer();
        }}
        {...restProps}
      />
    );
  };

  const toolTip = ({
    onOpenButtonClick,
    onDeleteButtonClick,
    onHide,
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
          onHide();
        }}
        {...restProps}
      />
    );
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
              reservationId={reservationId}
              stationId={params.id}
              userId={user.id}
              closeModal={setOpen}
              loading={onLoadingChange}
              reloadParams={() => {
                setReloadParams(false);
              }}
            />
          </Paper>
        </Modal>
      </Scheduler>
    </Paper>
  );
};

export default ReservationPage;
