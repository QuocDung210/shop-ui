import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import productsReducer from './slices/product';
import authReducer from './slices/authSlice';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    search: searchReducer,
    product: productsReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
// export default configureStore({
//     reducer: {
//         search: searchReducer,
//         product: productsReducer,
//         auth: authReducer,
//     },
// });
