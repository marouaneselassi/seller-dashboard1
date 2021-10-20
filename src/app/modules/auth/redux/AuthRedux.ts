import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {put, takeLatest} from 'redux-saga/effects'
import {UserModel} from '../models/UserModel'
import {getUserByToken} from './AuthCRUD'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  UserRequested: '[Request User] Action',
  UserLoaded: '[Load User] Auth API',
  SetUser: '[Set User] Action',
}

const initialAuthState: IAuthState = {
  user: undefined,
  accessToken: undefined,
  user_id : undefined
}

export interface IAuthState {
  user?: UserModel
  accessToken?: string,
  user_id : any
}

export const reducer = persistReducer(
  {storage, key: 'v100-demo1-auth', whitelist: ['user', 'accessToken', 'user_id']},
  (state: IAuthState = initialAuthState, action: ActionWithPayload<IAuthState>) => {
    switch (action.type) {
      case actionTypes.Login: {
        const accessToken = action.payload?.accessToken;
        const user_id = action.payload?.user_id;
        console.log('auth--s -- user_id', user_id)
        // const user_id = action.payload?.user_id;
        return {accessToken, user: undefined, user_id}
      }

      case actionTypes.Register: {
        const accessToken = action.payload?.accessToken;
        const user_id = action.payload?.user_id;
        // const user_id = action.payload?.user_id;
        return {accessToken, user: undefined, user_id}
      }

      case actionTypes.Logout: {
        return initialAuthState
      }

      case actionTypes.UserRequested: {
        return {...state, user: undefined}
      }

      case actionTypes.UserLoaded: {
        const user = action.payload?.user
        return {...state, user}
      }

      case actionTypes.SetUser: {
        const user = action.payload?.user
        return {...state, user}
      }

      default:
        return state
    }
  }
)

export const actions = {
  login: (accessToken: string, user_id : any) => ({type: actionTypes.Login, payload: {accessToken, user_id}}),
  register: (accessToken: string) => ({
    type: actionTypes.Register,
    payload: {accessToken},
  }),
  logout: () => ({type: actionTypes.Logout}),
  requestUser: () => ({
    type: actionTypes.UserRequested,
  }),
  // fulfillUser: (user: UserModel) => ({type: actionTypes.UserLoaded, payload: {user}}),
  fulfillUser: (user: any) => ({type: actionTypes.UserLoaded, payload: {user}}),
  setUser: (user: UserModel) => ({type: actionTypes.SetUser, payload: {user}}),
}

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser())
  })

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser())
  })

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const {data: user} = yield getUserByToken()
    yield put(actions.fulfillUser(user))
  })
}
