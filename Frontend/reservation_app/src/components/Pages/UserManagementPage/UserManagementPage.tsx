import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import "./UserManagementPage.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { UserResponse } from "../../../models/UserInterfaces";
import { UserService } from "../../../services/user/userService";
import UserDrawer from "../../UserDrawer/UserDrawer";

const UserManagementPage = () => {
  const [users, setUsers] = useState<UserResponse[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({
    id: 0,
    username: "",
    email: "",
    role: "",
    detailId: 0,
    name: "",
    surname: "",
    age: 0,
    city: "",
  });
  const userService = new UserService();

  const fetchAllUsers = () => {
    userService.getAllUsers().then((response) => {
      setUsers(response);
    });
  };

  const onEdit = (user: any) => {
    setCurrentUser({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      detailId: user.userDetails.id,
      name: user.userDetails.name,
      surname: user.userDetails.surname,
      age: user.userDetails.age,
      city: user.userDetails.city,
    });
    setOpen(true);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const deleteUser = (userId: any) => {
    userService.deleteUserById(userId).then(() => {
      let loggedInUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );
      let loggedInUserId = loggedInUser ? loggedInUser.id : 0;
      if (userId === loggedInUserId) {
        localStorage.clear();
        window.location.pathname = "/";
      }
    });
  };

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ width: "80%", margin: "20px auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="header border cell_item">Id</TableCell>
              <TableCell className="header border cell_item">
                Username
              </TableCell>
              <TableCell className="header border cell_item">Role</TableCell>
              <TableCell className="header border cell_item">Name</TableCell>
              <TableCell className="header border cell_item">Surname</TableCell>
              <TableCell className="header border cell_item">Age</TableCell>
              <TableCell className="header border cell_item">City</TableCell>
              <TableCell className="border"></TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
          </TableHead>
          {/* select dla role */}
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="cell_item">{user.id}</TableCell>
                  <TableCell className="cell_item">{user.username}</TableCell>
                  <TableCell className="cell_item">{user.role}</TableCell>
                  <TableCell className="cell_item">
                    {user.userDetails.name}
                  </TableCell>
                  <TableCell className="cell_item">
                    {user.userDetails.surname}
                  </TableCell>
                  <TableCell className="cell_item">
                    {user.userDetails.age}
                  </TableCell>
                  <TableCell className="cell_item">
                    {user.userDetails.city}
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    <DeleteIcon />
                  </TableCell>
                  <TableCell align="right" onClick={() => onEdit(user)}>
                    <EditIcon />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserDrawer
        userData={currentUser}
        userId={currentUser.id}
        open={open}
        onChange={setOpen}
      />
    </>
  );
};

export default UserManagementPage;
