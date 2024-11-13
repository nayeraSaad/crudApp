import { useState, useEffect } from "react";
import apiRequest from "../apiRequest";
export function UseFetch(url, id = "") {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const generalUrl = id ? `${url}/${id}` : url;

        const data = await apiRequest("GET", generalUrl);

        console.log(data);
        setFormData(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [url, id]);
  return { formData, loading, error, setFormData };
}
