import { createSlice } from '@reduxjs/toolkit';

const titleSlice = createSlice({
	name: 'title',
	initialState: {
		title: 'Rick and Morty',
	},
	reducers: {
		changeTitle: (state, action) => {
			return { title: action.payload };
		},
	},
	extraReducers: {},
});

export const { changeTitle } = titleSlice.actions;
export default titleSlice;
