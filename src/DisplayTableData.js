import React from "react";

export function DisplayTableData({ name, email, subscribe, interest, onEdit }) {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        <td>{subscribe ? "Yes" : "No"}</td>
        <td>{interest}</td>
      </tr>
    </>
  );
}
