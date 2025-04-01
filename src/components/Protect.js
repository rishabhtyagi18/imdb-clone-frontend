import React from "react";
import { useSelector } from "react-redux";

function Protect({ Component, params }) {
  const user = useSelector((state) => state.user.value);
  if (!user.name.length) {
    return <div>You are not authorized to view this page</div>;
  }
  return <Component params={params} />;
}

export default Protect;
