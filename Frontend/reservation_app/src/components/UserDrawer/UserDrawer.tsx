import { Drawer } from "@mui/material";
import UserPaper from "../UserPaper/UserPaper";

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
