import { API } from "@/helpers/axios";
import { ReadParkings, ReadParqueo } from "@/types/Read/parking";
import { useState } from "react";

const useParking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [parking] = useState<ReadParqueo | null>(null);
  const [parkings, setParkings] = useState<ReadParqueo[]>([]);

  const findAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get<ReadParkings>("/parqueo");
      console.log(res.data);
      setParkings(res.data.data);
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

  const findMany = async (criteria: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get<ReadParkings>(`/parqueo?search=${criteria}`);
      setParkings(res.data.data);
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

  return { loading, error, parking, parkings, findAll, findMany };
};

export default useParking;
