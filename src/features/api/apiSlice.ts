import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/constants';
import { buildUrl } from '../../utils/common';

//A way to get data that is different from axios. Redux toolit
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set('X-API-KEY', 'WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M');
      return headers;
    },
  }),
  tagTypes: ['Film'],
  endpoints: (builder) => ({
    getFilm: builder.query({
      query: ({ id }) => `/movie/${id}`,
    }),
    getFilms: builder.query({
      query: (params) => buildUrl('/movie', params),
    }),
  }),
});
export const { useGetFilmQuery, useGetFilmsQuery } = apiSlice;
