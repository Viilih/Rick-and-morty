import {
	AnyAction,
	configureStore,
	Store,
	ThunkDispatch,
} from '@reduxjs/toolkit';
import characterSlice from './Characters/characterSlice';
import titleSlice from './Title/titleSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export type RootState = ReturnType<typeof characterSlice.reducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
	dispatch: AppThunkDispatch;
};
const store = configureStore({
	reducer: {
		characterSlice: characterSlice.reducer,
		titleSlice: titleSlice.reducer,
	},
});
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
