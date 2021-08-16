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
