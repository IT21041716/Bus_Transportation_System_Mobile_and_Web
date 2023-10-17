import React from "react";
import { useParams } from "react-router-dom";

const UserJourney = () => {
  const { UID } = useParams();
  console.log("User Id ", UID);
  return <div>hi</div>;
};

export default UserJourney;
