import React, { useState } from "react";

import todaysDate from "../../utils/todaysDate";
const AddDepartment = () => {
  const [deptName, setDeptName] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    const data = {
      department: deptName,
      createdAt: todaysDate,
    };
    console.log(data);
    fetch("https://attendance-server-gamma.vercel.app/department", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          setSuccess(true);
          // console.log(e.deptName.value);
        }
      });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="deptName"
          required
          onChange={(e) => setDeptName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {success && <p>Done</p>}
    </div>
  );
};

export default AddDepartment;
