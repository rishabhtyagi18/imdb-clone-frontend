import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../utils/axios";
import Loading from "../components/Loading";

function AddMovie() {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  const [actorsArr, setActorsArr] = useState([1]);
  const [actors, setActors] = useState({});

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      const { id } = params;
      instance
        .get(`/movie/${id}`)
        .then((res) => {
          const movie = res.data.data;
          setInputs({
            name: movie.name,
            yearOfRelease: movie.yearOfRelease,
            producerName: movie.producer.name,
            rating: movie.rating,
            posterPath: movie.posterPath,
          });
          setActors(movie.actors.map((item) => item.name));
          let arr = [];
          for (let i = 0; i < movie.actors.length; i++) {
            arr.push(i);
          }
          setActorsArr(arr);
          setLoading(false);
        })
        .catch((err) => {
          alert("url invalid");
          navigate("/");
          console.log(err);
        });
    }
  }, []);

  const deleteEmpty = (arr) => {
    return arr.filter((item) => item !== "");
  };

  const handleChangeActors = (e) => {
    setActors((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = () => {
    if (
      !inputs.name ||
      !inputs.yearOfRelease ||
      !inputs.producerName ||
      !inputs.rating ||
      !inputs.posterPath
    ) {
      return alert("Please fill all the required fields");
    }
    let url;
    if (params.id) {
      url = `/movie/${params.id}`;
      instance
        .put(url, {
          ...inputs,
          actorNames: deleteEmpty(Object.values(actors)),
        })
        .then((res) => {
          setInputs({});
          setActors({});
          alert(res.data.message);
        })
        .catch((err) => console.log(err));
    } else {
      url = "/movie";
      instance
        .post(url, {
          ...inputs,
          actorNames: deleteEmpty(Object.values(actors)),
        })
        .then((res) => {
          setInputs({});
          setActors({});
          alert(res.data.message);
        })
        .catch((err) => console.log(err));
    }
  };
  if (loading) return <Loading />;
  return (
    <div style={{ marginTop: "10px" }}>
      <h2>{params.id ? "Edit Movie" : "Add Movie"}</h2>
      <div className="flex--container">
        <div className="edit--container">
          <div className="edit--input">
            <label htmlFor="moviename">Movie Name <span className="red-astrik">*</span></label>
            <input
              type="text"
              name="name"
              id="moviename"
              onChange={(e) => handleChange(e)}
              value={inputs["name"] || ""}
              required
            />
          </div>
          <div className="edit--input">
            <label htmlFor="moviename">Year of Release <span className="red-astrik">*</span></label>
            <input
              type="text"
              name="yearOfRelease"
              id="yearofrelease"
              onChange={(e) => handleChange(e)}
              value={inputs["yearOfRelease"] || ""}
              required
            />
          </div>
        </div>
        <div className="edit--container">
          <div className="edit--input">
            <label htmlFor="moviename">Poster <span className="red-astrik">*</span></label>
            <input
              type="text"
              name="posterPath"
              onChange={(e) => handleChange(e)}
              value={inputs["posterPath"] || ""}
              required
            />
          </div>
          <div className="edit--input">
            <label htmlFor="moviename">Rating <span className="red-astrik">*</span></label>
            <input
              type="number"
              name="rating"
              onChange={(e) => handleChange(e)}
              value={inputs["rating"] || ""}
              required
            />
          </div>
        </div>
        <div className="edit--container">
          <div className="edit--input">
            <label htmlFor="moviename">Producer Name <span className="red-astrik">*</span></label>
            <input
              type="text"
              name="producerName"
              onChange={(e) => handleChange(e)}
              value={inputs["producerName"] || ""}
              required
            />
          </div>
        </div>
        <div>
          <div className="edit--input">
            <label htmlFor="moviename">Actors</label>
            {actorsArr.map((item, index) => {
              return (
                <input
                  type="text"
                  name={item}
                  key={item}
                  onChange={(e) => handleChangeActors(e)}
                  value={actors[item] || ""}
                />
              );
            })}
            <div className="button--container">
              <button
                onClick={() =>
                  setActorsArr((prev) => [
                    ...prev,
                    actorsArr[actorsArr.length - 1] + 1,
                  ])
                }
              >
                Add Another Actor
              </button>
              <button onClick={handleClick}>
                {params.id ? "Update" : "Add Movie"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
