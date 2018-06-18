import { createAction } from 'redux-actions'

export const DETAILS_REQUEST = 'pilot/recipients/DETAILS_REQUEST'
export const requestDetails = createAction(DETAILS_REQUEST)

export const DETAILS_RECEIVE = 'pilot/recipients/DETAILS_RECEIVE'
export const receiveDetails = createAction(DETAILS_RECEIVE)
