import React from "react";
import { CURRBOARDNO } from "../actions/actioTypes";

let initialNum = 1;

const indexReducer = (state=initialNum,action)=>{
    switch (action.type) {
        case CURRBOARDNO : return action.payload;
        
        default : return state;
    }
}


export default indexReducer;
