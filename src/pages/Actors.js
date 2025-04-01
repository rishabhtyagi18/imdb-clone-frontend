import React from "react";
import { instance } from "../utils/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avvvatars from "avvvatars-react";
import Loading from "../components/Loading";

function Actors() {
  useEffect(() => {
    instance.get("/actor").then((res) => {
      setData(res.data.data);
      setIsLoading(false);
    });
  }, []);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="user--container">
      <h1>All Actors</h1>
      <div className="profile--container">
        {data?.map((item) => (
          <div
            className="profile--box"
            onClick={() => navigate(`/moviesbyactor/${item._id}`)}
          >
            <Avvvatars value={item.name} size={48} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Actors;
