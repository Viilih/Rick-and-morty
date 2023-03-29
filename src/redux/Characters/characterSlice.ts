import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CharacterState {
	data: any[];
	isSuccessful: boolean;
	message: string;
	loading: boolean;
	error: string | null;
}

const initialState = {
	data: [],
	isSuccessful: false,
	message: '',
	loading: false,
	error: null,
} as CharacterState;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getArrayCharacters = createAsyncThunk(
	'character/getArrayCharactersAPI',
	async (args, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(
				'https://rickandmortyapi.com/api/character'
			);
			return data;
		} catch (error) {
			console.error(error);
			// rejectWithValue(error.response.data)
		}
	}
);

export const removeCharacter = createAsyncThunk(
	'character/removeCharacterAPI',
	async (id: number, { getState, rejectWithValue }) => {
		try {
			const state = getState() as { character: CharacterState };
			const newData = state.character.data.filter(
				(character: any) => character.id !== id
			);
			return newData;
		} catch (error) {
			console.error(error);
		}
	}
);

const characterSlice = createSlice({
	name: 'character',
	initialState,
	reducers: {},
	extraReducers: {
		[getArrayCharacters.pending.type]: (state, { payload }) => {
			state.loading = true;
		},
		[getArrayCharacters.fulfilled.type]: (state, { payload }) => {
			state.loading = false;
			state.data = payload;
			state.isSuccessful = true;
		},
		[getArrayCharacters.rejected.type]: (state, { payload }) => {
			state.loading = false;
			state.message = payload.message;
			state.isSuccessful = false;
		},
		[removeCharacter.fulfilled.type]: (state, { payload }) => {
			state.loading = false;
			state.data = payload;
			state.isSuccessful = true;
			state.error = null;
		},
		[removeCharacter.rejected.type]: (state, { payload }) => {
			state.loading = false;
			state.message = payload.message;
			state.isSuccessful = false;
			state.error = payload.error;
		},
	},
});

export default characterSlice;
