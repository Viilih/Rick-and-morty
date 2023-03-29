const initialState = {
	characters: null,
};

const characterReducer = (state = initialState, action: any) => {
	if (action.type == 'characters/getCharacters') {
		return { ...state, characters: action.payload };
	}

	return state;
};

export default characterReducer;
