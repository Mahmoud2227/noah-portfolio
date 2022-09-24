import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";

import playerReducer from "./features/playerSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			player: playerReducer,
		},
	});
};

export const wrapper = createWrapper(makeStore);