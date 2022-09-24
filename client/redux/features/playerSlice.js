import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

const initialState = {
	currentAlbum: "",
	albumCover: "",
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

			if (action.payload?.album) {
				state.currentSongs = action.payload.album.songs;
				state.currentAlbum = action.payload.album.title;
				state.albumCover = action.payload.album.cover;
			}

			state.currentIndex = action.payload.i;
			state.isActive = true;
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
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {...state, ...action.payload.player};
		},
	},
});

export const {setActiveSong, nextSong, prevSong, playPause, setLoading} = playerSlice.actions;

export default playerSlice.reducer;
