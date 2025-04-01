import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import useFetchData from "../Hooks/useFetchData";
import Loading from "../components/Loading";

function Home({ url }) {
  const params = useParams();
  if (params.id) {
    url = `${url}/${params.id}`;
  }
  const { data, isLoading } = useFetchData(url);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="home--container">
      <h1>IMDB Clone</h1>
      <div className="card--container">
        {data?.map((item) => (
          <Card movie={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
