import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type {
  PropertyState,
  Response,
  IProperty,
  SaveResponse,
} from '../../types/index';

const initialState: PropertyState = {
  list: [],
  loading: false,
};
export const fetchProperties = createAsyncThunk(
  '/fetchProperties',
  async () => {
    const res: Response = await axios.get(process.env.REACT_APP_API_URL as string);
    if (res.data.succeeded) {
      const data = res.data.data;
      return data;
    }
  }
);
export const saveProperty = createAsyncThunk(
  '/saveProperty',
  async (body: IProperty) => {
    const res: SaveResponse = await axios.post(
      process.env.REACT_APP_API_URL as string,
      body
    );
    if (res.data.succeeded) {
      const data = res.data.data;
      return data;
    }
  }
);

export const PropertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.loading = true;
      if (action.payload) {
        state.list = action.payload;
        state.loading = false;
      }
    });
    builder.addCase(fetchProperties.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProperties.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(saveProperty.fulfilled, (state, action) => {
      state.loading = true;
      if (action.payload) {
        state.list.push(action.payload);
        state.loading = false;
      }
    });
    builder.addCase(saveProperty.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(saveProperty.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default PropertySlice.reducer;
