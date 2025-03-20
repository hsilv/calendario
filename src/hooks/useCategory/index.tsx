import { API } from "@/helpers/axios";
import { Category, ReadCategories } from "@/types/Read/category";
import { useState } from "react";

const useCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const findAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get<ReadCategories>("/categories");
      console.log("RESPUESTA >>>", response);
      setCategories(response.data.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, categories, findAll };
};

export default useCategory;
