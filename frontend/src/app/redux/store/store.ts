  import { configureStore, combineReducers } from '@reduxjs/toolkit';
  import {
    persistStore,
    persistReducer,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage'; 

  import userReducer from '@/app/redux/slices/login.Slice';
  import listAllGroupsReducer from '@/app/redux/slices/listAllGroups.slice';
  import getAllMembersReducer from '@/app/redux/slices/groupAllMembers.slice';
  import getAllUserReducer from '@/app/redux/slices/getAllusers.slice';
  import createExpenseReducer from '@/app/redux/slices/createExpense.slice';
  import getExpensesForUserReducer from '@/app/redux/slices/getExpensesForUser.slice';


  const rootReducer = combineReducers({
    user: userReducer,
    listAllGroups: listAllGroupsReducer,
    getAllMembers: getAllMembersReducer,
    getAllUsers: getAllUserReducer,
    createExpense: createExpenseReducer,
    getExpensesForUser: getExpensesForUserReducer,
  });

  export type RootState = ReturnType<typeof rootReducer>;

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], 
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const makeStore = () => {
    const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    const persistor = persistStore(store);

    return { store, persistor };
  };

  // Types
  export type AppStore = ReturnType<typeof makeStore>['store'];
  export type AppDispatch = AppStore['dispatch'];
