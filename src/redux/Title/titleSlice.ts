import { createSlice } from '@reduxjs/toolkit';

export interface TitleState {
	title: string;
}

const titleSlice = createSlice({
	name: 'title',
	initialState: {
		title: 'Rick and Morty',
	} as TitleState,
	reducers: {
		changeTitle: (state, action) => {
			state.title = action.payload;
		},
	},
	extraReducers: {},
});

export const { changeTitle } = titleSlice.actions;
export default titleSlice;
