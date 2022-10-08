import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
	isHidden: true,
	theme: "dark",
	visualizer: {
		type: "spectrum",
		options: {
			backlight: true,
			bars: true,
			particles: true,
			glow: true,
		},
	},
};

const settingsSlice = createSlice({
	name: "settings",
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

export const {setVisualizer, toggleHidden} = settingsSlice.actions;

export default settingsSlice.reducer;
