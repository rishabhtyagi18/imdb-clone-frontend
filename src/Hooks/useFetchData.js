import { useState, useEffect } from "react";
import { instance } from "../utils/axios";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  const fetchProducts = async () => {
    try {
      const res = await instance.get(url);
      setData(res.data.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { isLoading, data, isError };
};

export default useFetchData;
