export interface IProperty {
  address: string;
  description: string;
  id?: number;
}

export interface PropertyState {
  list: IProperty[];
  loading: boolean,
}

interface Data {
  succeeded: boolean;
  message: string;
}

interface SaveData extends Data {
  data: IProperty;
}

interface GetData extends Data {
  data: IProperty[];
}

export interface Response {
  data: GetData;
}

export interface SaveResponse {
  data: SaveData;
}
