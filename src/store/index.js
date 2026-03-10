import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./slices/authSlice";
import notificationReducer from "./slices/notificationSlice";
import locationReducer from "./slices/locationSlice";
const persistConfig = {
  key: "erental-root",
  storage: AsyncStorage,
  whitelist: ["auth", "location"]
  // persist auth + location, not notifications
};
const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
  location: locationReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});
const persistor = persistStore(store);
export {
  persistor,
  store
};
