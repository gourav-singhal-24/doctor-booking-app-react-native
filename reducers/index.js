import { combineReducers } from 'redux';
import SpecialityReducer from './reducer_Speciality.js';
import DoctorlistReducer from './reducer_DoctorsList.js';
const rootReducer = combineReducers({
       speciality: SpecialityReducer,
       doctorsList: DoctorlistReducer
});

export default rootReducer;
