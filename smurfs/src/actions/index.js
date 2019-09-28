export const GET_SMURFS = 'GET_SMURFS'
export const ADD_SMURF = 'ADD_SMURF'
export const INVALIDATE_SMURF = 'INVALIDATE_SMURF'
export const REQUEST_SMURF = 'REQUEST_SMURF'
export const GOT_SMURFS = 'GOT_SMURFS'


export const requestSmurf = smurf => ({
    type: REQUEST_SMURF,
    smurf
})

export const invalidateSmurf = smurf => ({
    type: INVALIDATE_SMURF,
    smurf
})

export const addSmurf = smurf => ({
    type: ADD_SMURF,
    smurf
})

export const getSmurfs = smurf =>({
    type: GET_SMURFS,
    smurf
})

export const gotSmurfs = (smurf, json) =>({
    type: GOT_SMURFS,
    smurf,
    items: json.data.smurfs.map(s => s.data),
    receivedAt: Date.now()
})

const fetchSmurfs = smurf => dispatch => {
    dispatch(getSmurfs(smurf))
    return fetch()
      .then(response => response.json())
      .then(json => dispatch(gotSmurfs(smurf, json)))
  }
  
  const shouldFetchSmurfs = (state, smurf) => {
    const smurfs = state.requestSmurf[smurf]
    if (!smurfs) {
      return true
    }
    if (smurfs.isFetching) {
      return false
    }
    return smurfs.didInvalidate
  }
  
  export const fetchSmurfsIfNeeded = smurf => (dispatch, getState) => {
    if (shouldFetchSmurfs(getState(), smurf)) {
      return dispatch(fetchSmurfs(smurf))
    }
  }