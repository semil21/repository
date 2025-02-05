export interface itemType {
  _id?: string;
  user?: string;
  restaurant: string;
  name?: string;
  category?: string;
  price?: number;
  quantity?: string;
  status?: boolean;
}

export interface itemTypes {
  _id?: string;
  user?: string;
  restaurant: {
    _id?: string;
    name?: string;
  };
  name?: string;
  category: {
    _id?: string;
    name?: string;
  };
  price?: number;
  quantity?: string;
  status?: boolean;
}
