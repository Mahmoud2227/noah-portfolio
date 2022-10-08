import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";

import playerReducer from "./features/playerSlice";
import settingsReducer from "./features/settingsSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			player: playerReducer,
			settings: settingsReducer,
		},
	});
};

export const wrapper = createWrapper(makeStore);
