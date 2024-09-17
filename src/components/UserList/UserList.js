import React from "react";

const UserList = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => {
          return (
            <tr>
              <td>{u.name}</td>
              <td>{u.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;
