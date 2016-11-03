const BASE_URL =  'http://172.18.2.218/drupal/health-app/api';

export const REQUEST_DOCTORLIST = 'REQUEST_DOCTORLIST';
export const REQUEST_DOCTORLIST_SUCCESS = 'REQUEST_DOCTORLIST_SUCCESS';
export const REQUEST_DOCTORLIST_FAIL = 'REQUEST_DOCTORLIST_FAIL';

export function fetchDoctorList(specialityId = 0, location = null , page = 0){
   var query = '';

        if (specialityId && (specialityId != 0 && specialityId != 23)) {
            query = '?category=' + specialityId;
            if (location && location != null) {
                query = query + '&location=' + location;
            }
        }
        if(page != 0) {
          query = query + '?page=' + page;
        }
        console.log(query);
  
  const url = `${BASE_URL}/doctors${query}`;
   return dispatch => {
     dispatch(requestDoctorList())
      return fetch(url)
            .then(res => res.json())
               .then(
                      data => dispatch(receiveDoctorListSuccess(data)),
                      err => dispatch(receiveDoctorListFail(err))
                    );
  }
}
 
function requestDoctorList() {
  return {
    type: REQUEST_DOCTORLIST
  }
}

function receiveDoctorListSuccess(data) {
 return {
    type: REQUEST_DOCTORLIST_SUCCESS,
    data
  }
}

function receiveDoctorListFail(err) {
   return {
    type: REQUEST_DOCTORLIST_FAIL,
    err
  }
}
 