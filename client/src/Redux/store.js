import { configureStore } from '@reduxjs/toolkit';
import userimageReducer from './userimageReducer';
import usernameReducer from './usernameReducer';
import authReducer from'./authSlic'

const store = configureStore({
    reducer: {
        username: usernameReducer,
        userImage: userimageReducer,
        authSlice:authReducer

    },
})

export default store;