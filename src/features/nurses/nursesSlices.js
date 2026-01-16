
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFilterNurses, getSingleNurse } from '../filter/filterApi';


export const fetchFilterNurses = createAsyncThunk(
    'nurses/fetchFilterNurses',
    async ({ expert, gender, location }) => {
        const nurses = await getFilterNurses(expert, gender, location);
        return nurses;
    }
);

export const fetchSingleNurse = createAsyncThunk(
    'nurses/fetchSingleNurse',
    async (id) => {
        const nurse = await getSingleNurse(id);
        return nurse;
    }
);

export const filternursesSlice = createSlice({
    name: 'filternurses',
    initialState: {
        filterNurses: [],
        nurse: {},
        isLoading: false,
        isError: false,
        error: ''
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilterNurses.pending, (state) => {
                state.isError = false;
                state.isLoading = true
            })
            .addCase(fetchFilterNurses.fulfilled, (state, action) => {
                state.filterNurses = action.payload;
                state.isLoading = false

            })
            .addCase(fetchFilterNurses.rejected, (state, action) => {
                state.isLoading = true
                state.filterNurses = [];
                state.isError = true;
                state.error = action.payload?.error?.message;
            })
            .addCase(fetchSingleNurse.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchSingleNurse.fulfilled, (state, action) => {
                state.nurse = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchSingleNurse.rejected, (state, action) => {
                state.isLoading = false;
                state.nurse = {};
                state.isError = true;
                state.error = action.error?.message;
            })
    }
});

export default filternursesSlice.reducer;