export type tableType = {
  _id?: string;
  user?: string;
  name?: string;
  address?: string;
  city?: string;
  tables?: Array<{
    _id?: string;
    number?: number;
    capacity?: number;
  }>;
};

export type addNewTable = {
  _id?: string;
  restaurant?: string;
  number?: number;
  capacity?: number;
};
