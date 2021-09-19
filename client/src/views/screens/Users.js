import React, { useEffect, useState } from "react";
import Table from "../../utilities/Table";
import { userColumns } from "../../utilities/utility";
import UserCards from "../components/users/UserCards";
import axios from "axios"

export default function Users() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("https://munkybox-admin.herokuapp.com/api/users")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="wrapper wrapper-content">
      <UserCards />
      <Table title="User" data={user} columns={userColumns} />
    </div>
  );
}
