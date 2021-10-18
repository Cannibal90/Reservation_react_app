import { Paper } from "@mui/material";
import users from "../../images/users.jpg";
import desk from "../../images/desk.jpg";
import reservation from "../../images/reservation.jpg";
import classroom from "../../images/classroom.jpg";
import { Link } from "react-router-dom";

const ManagementOption = (props: { option: any; link: any }) => {
  const getImg = () => {
    switch (props.option) {
      case "Users":
        return users;
      case "Laboratory":
        return classroom;
      case "Reservations":
        return reservation;
      default:
        return users;
    }
  };

  return (
    <Link to={props.link}>
      <Paper
        variant="outlined"
        square
        elevation={24}
        style={{ height: "450px", margin: "0 10px 0 10px" }}
      >
        <img src={getImg()} className="mask" />
      </Paper>

      <Paper
        variant="outlined"
        square
        elevation={24}
        style={{ height: "60px", margin: "0 10px 0 10px" }}
      >
        <h3>{props.option}</h3>
      </Paper>
    </Link>
  );
};

export default ManagementOption;
