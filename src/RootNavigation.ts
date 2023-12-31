import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: object) {
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.navigate(name, params));
    }
}

export const territoryNavigationRef = createNavigationContainerRef();

export function territoriesNavigate(name: string, params?: object) {
    if(territoryNavigationRef.isReady()){
        territoryNavigationRef.dispatch(CommonActions.navigate(name, params));
    }
}