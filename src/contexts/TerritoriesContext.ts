import AsyncStorage from "@react-native-async-storage/async-storage"
import createDataContext from "./createDataContext"
import { ITerritory, PaginateResult } from "./interfaces"
import territories from "../api/territories"
import { AxiosError } from "axios"
import { navigate } from "../RootNavigation"
import { ITerritoryForm } from "../screens/territories/NewScreen"

interface ITerritoryState {
    isLoading?: boolean,
    territories?: PaginateResult<ITerritory>
    errMessage?: string,
    territory?: ITerritory;
    allTerritories?: ITerritory[],
    currentIndex?: number
}

interface ITerritoryContext {
    state: ITerritoryState
    loadTerritories: Function,
    loadTerritoryHistory: Function,
    loadAvailableTerritories: Function,
    addTerritory: Function,
    editTerritory: Function,
    deleteTerritory: Function,
    searchTerritory: Function
}

const TerritoryReducer = (state: ITerritoryState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case 'turn_on_loading':
            return { ...state, isLoading: true }
        case 'turn_off_loading':
            return { ...state, isLoading: false }
        case 'load_data':
            return { ...state, isLoading: false, territories: action.payload }
        case 'load_territory':
            return { 
                ...state, 
                isLoading: false, 
                territory: action.payload.territory, 
                currentIndex: action.payload.currentIndex, 
                allTerritories: action.payload.territories
            }
        case 'add_error': 
            return { ...state, errMessage: action.payload }
        default:
            return state;
    }
}

const loadTerritories = (dispatch: Function) => {
    return async (page: number, limit: number) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.get(`/territories?page=${page}&limit=${limit}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'load_data', payload: response.data })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    
    }
}

const loadTerritoryHistory = (dispatch: Function) => {
    return async (territoryID: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.get(`/territories/${territoryID}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'load_territory', payload: response.data })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    
    }
}

const loadAvailableTerritories = (dispatch: Function) => {
    return async (page: number, limit: number) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.get(`/territories/available?page=${page}&limit=${limit}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'load_data', payload: response.data })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    
    }
}

const searchTerritory = (dispatch: Function) => {
    return async (param: string, paramValue: string, page: number, limit: number, type: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.get(`/territories/${type}/search?${param}=${paramValue}&page=${page}&limit=${limit}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'load_data', payload: response.data })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }

    }
}

const addTerritory = (dispatch: Function) => {
    return async (body: ITerritoryForm) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.post(`/territories`, body, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });

            navigate('TerritoriesList');
            dispatch({ type: 'turn_off_loading' })
        } catch(err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    }
}

const editTerritory = (dispatch: Function) => {
    return async (territoryID: string, body: ITerritoryForm) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.put(`/territories/${territoryID}`, {territory: body}, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });

            dispatch({ type: 'turn_off_loading' })
            navigate('TerritoryHistory', { id: territoryID });
        } catch(err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    }
}

const deleteTerritory = (dispatch: Function) => {
    return async (territoryID: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.delete(`/territories/${territoryID}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });

            navigate('TerritoriesList');
            dispatch({ type: 'turn_off_loading' })
        } catch(err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    }
}

export const { Context, Provider } = createDataContext<ITerritoryState, ITerritoryContext>(TerritoryReducer, {loadTerritories, loadTerritoryHistory, searchTerritory, loadAvailableTerritories, addTerritory, editTerritory, deleteTerritory}, { isLoading: false})