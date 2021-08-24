export type ItemProp = {
  id: string;
  name: string;
  packed: boolean;
};

export type CategoryType = {
  id: string;
  name: string;
  items: ItemProp[];
};

export type ShowType = "all" | "packed" | "unpacked";
export type DeleteItemEvent = { deleteItem: { itemId: string } };
export type DeleteCatEvent = { deleteCat: { catId: string }; persist };
