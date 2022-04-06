import { useEffect, useState, useCallback } from 'react'
import { FilterBy } from '../state/application/actions'
import { NFTInfo } from '../types/index'

function filterDataByParams(data, params) {
  if (params?.nftid) {
    return data.filter((item) => +item.id === +params.nftid)
  }
  return data
}

function filterDataByValidOfAccount(data, dataByAccount) {
  const arr: NFTInfo[] = []
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const fData = dataByAccount.find((o) => o.id === item.id)
    if (fData) {
      arr.push(fData)
    }
  }
  return arr
}

const useDataLocale = (cache_key, path, params?: FilterBy, dataByAccount?: NFTInfo[]): [any, (p: any) => void, (p: any) => void] => {
  const [data, setData] = useState<any>([])

  const saveData = useCallback(
    async (item) => {
      if (cache_key) {
        const isValid = data.some((o) => o.id === item.id)
        let newData = [...data, item]
        if (isValid) {
          newData = newData.filter((o) => o.id !== item.id)
        }
        window.localStorage.setItem(`${cache_key}:${path}`, JSON.stringify(newData))
        const filterBy = filterDataByParams(newData, params)
        setData(filterBy)
      }
    },
    [cache_key, data, path, params]
  )

  const deleteFavorite = useCallback(
    (item) => {
      if (item && cache_key) {
        const isValid = data.some((o) => o.id === item.id)
        if (isValid) {
          const newData = data.filter((o) => o.id !== item.id)
          window.localStorage.setItem(`${cache_key}:${path}`, JSON.stringify(newData))
          setData(newData)
        }
      }
    },
    [cache_key, data, path]
  )

  useEffect(() => {
    if (cache_key && dataByAccount) {
      const list: any = window.localStorage.getItem(`${cache_key}:${path}`) || []
      if (list && list.length > 0) {
        const filterByParams = filterDataByParams(JSON.parse(list), params)
        const filterByValidOfAccount = filterDataByValidOfAccount(filterByParams, dataByAccount)
        setData(filterByValidOfAccount)
      }
    }
  }, [cache_key, params, path, dataByAccount])

  return [data, saveData, deleteFavorite]
}

export default useDataLocale
