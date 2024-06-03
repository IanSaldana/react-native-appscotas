import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pets: [],
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    fetchPetsSuccess: (state, action) => {
      state.pets = action.payload;
    },
  },
});

export const { fetchPetsSuccess } = petSlice.actions;
export default petSlice.reducer;
