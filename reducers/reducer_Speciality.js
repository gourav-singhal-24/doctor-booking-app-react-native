import { REQUEST_SPECIALITIES, RECEIVE_SPECIALITIES_SUCCESS, RECEIVE_SPECIALITIES_FAILURE } from '../actions/gridSpeciality.js';

const INITIAL_STATE = { isFetching:false, data:[], error:null };

export default function( state=INITIAL_STATE, action ){
  let dataSource=[];
   switch(action.type){
     case REQUEST_SPECIALITIES: 
               return { ...state, isFetching:true, data:[] };
     
     case RECEIVE_SPECIALITIES_SUCCESS:
               dataSource = Array.from(action.data);
               return { ...state, isFetching:false, data:dataSource }
               
     case  RECEIVE_SPECIALITIES_FAILURE:         
               return { ...state, isFetching:true, data:{},error:action.err }
    default:
        return state;
  }
 
}