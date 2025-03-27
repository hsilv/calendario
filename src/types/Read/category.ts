import { FetchInterface } from "../fetch";

interface Category {
  id: number;
  categoria: string;
}

interface ReadCategories extends FetchInterface {
  data: Category[];
}

export type { ReadCategories, Category };
