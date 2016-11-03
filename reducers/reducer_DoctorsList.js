import { REQUEST_DOCTORLIST, REQUEST_DOCTORLIST_SUCCESS, REQUEST_DOCTORLIST_FAIL } from '../actions/doctorsList.js';

const INITIAL_STATE = {isLoading:false,data:[]};

export default function (state = INITIAL_STATE, action){
  switch(action.type){
    case REQUEST_DOCTORLIST:
          return {...state, isLoading:true, data:[]};
    
    case REQUEST_DOCTORLIST_SUCCESS:
           return {...state, isLoading:false, data:action.data };
    
    case REQUEST_DOCTORLIST_FAIL:
          return { ...state, isLoading:true, data:[] };
    default :  
        return state ;
  }
}