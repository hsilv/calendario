import { Parqueo } from "../Read/parking";

type CreateParqueo = Omit<Parqueo, "id"> & { id?: string };

export type { CreateParqueo };
