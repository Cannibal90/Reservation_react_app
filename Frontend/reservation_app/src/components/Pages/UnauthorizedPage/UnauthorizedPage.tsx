import url from "../../../images/gandalf.jpg";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export function UnautorizedPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
      }}
    >
      <img src={url} alt="unauthorized" />
      <Typography variant="h2">Error 403 - unauthorized!</Typography>
      <Link to="/">
        <Typography
          style={{ fontSize: "20px", marginBottom: "50px", color: "#9706eb" }}
        >
          Back to HomePage
        </Typography>
      </Link>
    </div>
  );
}
