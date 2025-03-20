import { FetchInterface } from "../fetch";

interface Category {
  id: string;
  categoria: string;
}

interface ReadCategories extends FetchInterface {
  data: Category[];
}

export type { ReadCategories, Category };
