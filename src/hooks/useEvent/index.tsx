import {
  CreatedEvent,
  CreateEvent,
  Event,
  ReadAllEvents,
  ReadEvent,
} from "@/types/Read/events";
import { useState } from "react";

import { API } from "@/helpers/axios";

const useEvent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const findAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get<ReadAllEvents>("/evento");
      setEvents(response.data.data);
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

  const findOne = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get<ReadEvent>(`/evento/${id}`);
      setEvent(response.data.data);
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

  const createEvent = async (data: CreateEvent) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.post<CreatedEvent>("/evento", data);
      setEvent(response.data?.data?.data);
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

  return {
    loading,
    error,
    event,
    events,
    findAll,
    findOne,
    createEvent,
    setEvent,
  };
};

export default useEvent;
