import { NFTInfo } from '../types/index'

export interface ResponseApi {
  data: NFTInfo[]
  page: number
  total: number
}
