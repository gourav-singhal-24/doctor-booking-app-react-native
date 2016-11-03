const BASE_URL =  'http://172.18.2.218/drupal/health-app/api';

export const REQUEST_SPECIALITIES = 'REQUEST_SPECIALITIES';
export const RECEIVE_SPECIALITIES_SUCCESS = 'RECEIVE_SPECIALITIES_SUCCESS';
export const RECEIVE_SPECIALITIES_FAILURE = ' RECEIVE_SPECIALITIES_FAILURE'
 
export function fetchSpecialities(){
  const url = `${BASE_URL}/speciality`;
  return dispatch => {
     dispatch(requestSpecialities())
      return fetch(url)
               .then(res => res.json())
               .then(
                      data => dispatch(receiveSpecialitiesSuccess(data)),
                      err => dispatch(receiveSpecialitiesFail(err))
                    );
  }
}
 
function requestSpecialities() {
  return {
    type: REQUEST_SPECIALITIES
  }
}

function receiveSpecialitiesSuccess(data) {
 return {
    type: RECEIVE_SPECIALITIES_SUCCESS,
    data
  }
}
function receiveSpecialitiesFail(err) {
  return {
    type: RECEIVE_SPECIALITIES_FAILURE,
    err
  }
}
 