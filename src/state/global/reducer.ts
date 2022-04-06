import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

export interface CollectionState {
  version: number
}

const initialState: CollectionState = {
  version: 1,
}

export default createReducer(initialState, (builder) =>
  builder.addCase(actions.updateVersion, (state, { payload }) => {
    state.version = payload
  })
)
