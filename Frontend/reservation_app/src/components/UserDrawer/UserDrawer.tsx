import { CloseOutlined } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import UserPaper from "../UserPaper/UserPaper";
import "./UserDrawer.css";

const UserDrawer = (props: {
  userData: any;
  userId: any;
  open: any;
  onChange: any;
}) => {
  const closeDrawer = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    props.onChange(false);
  };

  return (
    <>
      <Drawer anchor="right" open={props.open} onClose={closeDrawer}>
        <CloseOutlined
          className="close_drawer"
          onClick={() => {
            props.onChange(false);
          }}
        />
        <UserPaper
          userData={props.userData}
          userId={props.userId}
          drawer={true}
        />
      </Drawer>
    </>
  );
};

export default UserDrawer;
