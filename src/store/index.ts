import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'

import CategoriesReducer from './categories/categories.reducer'
import { rootSaga } from './rootSaga'

const combineReducer = combineReducers({
  Categories: CategoriesReducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logout') {
    state = undefined
  }
  return combineReducer(state, action)
}

const middleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: [middleware],
  devTools: true,
})

middleware.run(rootSaga)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export * from './categories/categories.action'
export * from './categories/categories.selector'