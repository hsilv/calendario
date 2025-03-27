import { Parqueo } from "../Read/parking";

type CreateParqueo = Omit<Parqueo, "id">;

export type { CreateParqueo };
