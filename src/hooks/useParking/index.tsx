import { API } from "@/helpers/axios";
import { Parqueo } from "@/types/Read/parking";
import { useState } from "react";

const useParking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [parking, setParking] = useState<Parqueo | null>(null);
  const [parkings, setParkings] = useState<Parqueo[]>([]);

  const findAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get<Parqueo[]>("/parking");
      setParkings(res.data);
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
      const res = await API.get<Parqueo>(`/parking?search=${criteria}`);
      setParking(res.data);
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
