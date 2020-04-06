import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_LEADERS } from "../../utils/Queries";

const Leaders = () => {
  const { loading, error, data } = useQuery(GET_LEADERS);

  console.log("data", data);

  return (
    <div>
      <h1>Leaders</h1>
    </div>
  );
};

export default Leaders;
