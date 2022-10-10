import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

const localStorageVisualizer =
	typeof window !== "undefined" ? JSON.parse(localStorage?.getItem("visualizer")) : null;

const initialState = {
	isHidden: true,
	theme: "dark",
	visualizer: localStorageVisualizer || {
		type: "spectrum",
		options: {
			backlight: true,
			showBars: true,
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
			localStorage.setItem("visualizer", JSON.stringify(action.payload));
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
