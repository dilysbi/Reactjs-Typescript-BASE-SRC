import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'
import { ResponseApi } from '../types'

export interface CollectionState {
  nftMarket: ResponseApi
}

const initialState: CollectionState = {
  nftMarket: {
    data: undefined,
    total: 0,
    page: 0,
    lastPage: 0,
    perPage: 0,
  },
}

export default createReducer(initialState, (builder) =>
  builder.addCase(actions.setNFTMarketToState, (state, { payload }) => {
    state.nftMarket = payload
  })
)
