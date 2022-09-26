import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
	meta:null,
	currentSongs: [],
	currentIndex: null,
	isActive: false,
	isHidden: false,
	isPlaying: false,
	activeSong: {},
};

const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		setActiveSong: (state, action) => {
			state.activeSong = action.payload.song;

			if (action.payload?.meta) {
				state.currentSongs = action.payload.playlist;
				state.meta = action.payload.meta;
			}

			state.currentIndex = action.payload.i;
			state.isActive = true;
			state.isPlaying = true;
		},

		nextSong: (state, action) => {
			state.activeSong = state.currentSongs[action.payload];

			state.currentIndex = action.payload;
			state.isActive = true;
		},

		prevSong: (state, action) => {
			state.activeSong = state.currentSongs[action.payload];

			state.currentIndex = action.payload;
			state.isActive = true;
		},
		playPause: (state, action) => {
			state.isPlaying = action.payload;
		},
		toggleHidden: (state) => {
			state.isHidden = !state.isHidden;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {...state, ...action.payload.player};
		},
	},
});

export const {setActiveSong, nextSong, prevSong, playPause, toggleHidden} = playerSlice.actions;

export default playerSlice.reducer;
