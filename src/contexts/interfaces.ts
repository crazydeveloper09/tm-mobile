import { Dispatch } from "react";

export interface Actions {

}

export interface BoundActions {
    signIn?: (dispatch: Dispatch<void>) => void
}