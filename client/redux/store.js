import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";

import playerReducer from "./features/playerSlice";
import optionsReducer from "./features/optionsSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			player: playerReducer,
			options: optionsReducer,
		},
	});
};

export const wrapper = createWrapper(makeStore);
