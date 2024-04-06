import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

export const getFilms = createAsyncThunk(
  'films/getFilms',
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/movie`, {
        headers: {
          'X-API-KEY': 'WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M',
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue;
    }
  }
);

const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    list: [],
    filtered: [],
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      // state.filtered = state.list.filter((item) => item.price < payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFilms.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});
export const { filterByPrice } = filmsSlice.actions;
export default filmsSlice.reducer;
