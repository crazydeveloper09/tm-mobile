import createDataContext from "./createDataContext";
import tmApi from "../api/territories";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../RootNavigation";
import { IActivity, ICongregation } from "./interfaces";
import { showMessage } from "react-native-flash-message";

export interface IAuth {
  token: string;
  errMessage: string;
  successMessage: string;
  userID?: string;
  isLoading?: boolean,
  congregation?: ICongregation
  activities?: IActivity[]
}

export interface IAuthContext {
  state: IAuth;
  signIn: Function;
  signOut: Function;
  verifyUser: Function;
  tryLocalSignIn: Function;
  loadCongregationInfo: Function;
  loadCongregationActivities: Function;
  editCongregation: Function;
}

interface ISignIn {
  username: string;
  password: string;
}

type ITwoFactor = { code: number, userID: string }

const authReducer = (state: IAuth, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'add_error': 
        return { ...state, errMessage: action.payload, isLoading: false }
    case 'add_success': 
        return { ...state, successMessage: action.payload.message, errMessage: '', userID: action.payload.userID, isLoading: false }
    case 'signin': 
        return { ...state, errMessage: '', successMessage: action.payload.message, token: action.payload.token, isLoading: false}
    case 'signout': 
        return {...state, token: '', userID: '', successMessage: 'Wylogowano z Territory Manager'}
    case 'add_cong_info': 
      return {...state, isLoading: false, congregation: action.payload, errMessage: '', successMessage: state.successMessage}
    case 'add_cong_activities': 
      return {...state, isLoading: false, activities: action.payload, errMessage: ''}
    case 'turn_on_loading': 
      return {...state, isLoading: true, errMessage: ''}
    case 'turn_off_loading': 
      return {...state, isLoading: false}
    case 'debug':
        return state;
    default:
      return state;
  }
};

const signIn = (dispatch: Function) => {
  return async (body: ISignIn) => {
    try {
      dispatch({ type: 'turn_on_loading' })
      const response = await tmApi.post("/login", body);
      if(response.data === 'Zła nazwa użytkownika lub hasło'){
        dispatch({ type: 'add_error', payload: response.data })
      } else {
        dispatch({ type: 'add_success', payload: {message: response.data.message, userID: response.data.userID} })
        navigate("TwoFactor");
      }
    } catch (err) {
      dispatch({ type: 'add_error', payload: (err as AxiosError).message })
    }
  };
};

const signOut = (dispatch: Function) => {
    return async () => {
        await AsyncStorage.removeItem('token')
        dispatch({ type: 'signout' })
    };
};

const verifyUser = (dispatch: Function) => {
    return async(body: ITwoFactor) => {
        try {
          dispatch({ type: 'turn_on_loading' })
            const response = await tmApi.post(`/congregations/${body?.userID}/two-factor`, body);
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', payload: { token: response.data.token, message: response.data.message } });
            dispatch({ type: 'debug' })
            
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    }
}

const tryLocalSignIn = (dispatch: Function) => {
  return async () => {
    const token = await AsyncStorage.getItem('token')
    dispatch({ type: 'signin', payload: { token: token, successMessage: 'Automatycznie zalogowano do aplikacji' } })
    showMessage({
      message: 'Automatycznie zalogowano do aplikacji',
      type: 'success'
    })
  }
}

const loadCongregationInfo = (dispatch: Function) => {
  return async () => {
    try {
      dispatch({ type: 'turn_on_loading' })
      const token = await AsyncStorage.getItem('token');
      const response = await tmApi.get(`/congregations`, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      dispatch({ type: 'add_cong_info', payload: response.data.congregation })
    } catch(err) {
      dispatch({ type: 'add_error', payload: (err as AxiosError).message })
    }
  }
}

const loadCongregationActivities = (dispatch: Function) => {
  return async (congregationID: string) => {
    try {
      dispatch({ type: 'turn_on_loading' })
      const token = await AsyncStorage.getItem('token');
      const response = await tmApi.get(`/congregations/${congregationID}/activities`, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      dispatch({ type: 'add_cong_activities', payload: response.data })
    } catch(err) {
      dispatch({ type: 'add_error', payload: (err as AxiosError).message })
    }
  }
}

const editCongregation = (dispatch: Function) => {
  return async (username: string, territoryServantEmail: string, ministryOverseerEmail: string, mainCity: string, congregationID: string) => {
    try {
        dispatch({ type: 'turn_on_loading' })
        const token = await AsyncStorage.getItem('token');
        const response = await tmApi.put(`/congregations/${congregationID}`, {congregation: {username, territoryServantEmail, ministryOverseerEmail, mainCity}}, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        });
        navigate('CongInfo');
        dispatch({ type: 'turn_off_loading' })
        showMessage({
          message: `Poprawnie edytowano informacje zborowe`,
          type: 'success',
      })
    } catch(err) {
        dispatch({ type: 'add_error', payload: (err as AxiosError).message })
    }
}
}

export const { Context, Provider } = createDataContext<IAuth, IAuthContext>(
  authReducer,
  { signIn, signOut, verifyUser, tryLocalSignIn, loadCongregationInfo, editCongregation, loadCongregationActivities },
  { token: "", errMessage: "", successMessage: "" }
);
