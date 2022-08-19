import { createSlice } from '@reduxjs/toolkit';

export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        music: [],
    },
    reducers: {
        addMusic: (state, action) => {
            state.music.push(action.payload);
        }
    }
});

export const { addMusic } = musicSlice.actions;

// selectors
export const selectMusic = (state) => state.music.music;

export default musicSlice.reducer;
