import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
	isHidden: true,
	theme: "dark",
	visualizer: {
		type: "bubbles",
		options: {},
	},
};

const optionsSlice = createSlice({
	name: "options",
	initialState,
	reducers: {
		toggleHidden: (state) => {
			state.isHidden = !state.isHidden;
		},
		setVisualizer: (state, action) => {
			state.visualizer = action.payload;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {...state, ...action.payload.player};
		},
	},
});

export const {setVisualizer, toggleHidden} = optionsSlice.actions;

export default optionsSlice.reducer;
