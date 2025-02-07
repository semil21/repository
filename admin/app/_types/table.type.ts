export type tableType = {
  _id?: string;
  user?: string;
  name?: string;
  address?: string;
  city?: string;
  tables?: Array<{
    number?: number;
    capacity?: number;
  }>;
};

export type addNewTable = {
  restaurant?: string;
  number?: number;
  capacity?: number;
};
