import { useCallback } from 'react'
import { get } from 'lodash'
// import BigNumber from 'bignumber.js'
import Misc from 'helpers/Misc'

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

const unlimited = '115792089237316195423570985008687907853269984665640564039457584007913129639935'

const approve = async (_contract, _account, _spender, _amount, _CBSuccess, _CBError, _withUnlimited) => {
  if (!_contract?.methods) return _CBError('Contract is not defined!!!')
  try {
    return await _contract.methods
      .approve(_spender, _withUnlimited ? unlimited : _amount)
      .send({ from: _account })
      .on('error', (error) => {
        let messageError = get(error, 'message', '')
        if (messageError.length > 100) {
          messageError = 'Occurred approve error!!!'
        }
        _CBError(messageError)
      })
      .on('receipt', async (receipt) => {
        await Misc.sleep(200)
        _CBSuccess(receipt)
      })
  } catch (error) {
    console.error('approve error', approve)
    let messageError = get(error, 'message', '')
    if (messageError.length > 100) {
      messageError = 'Occurred approve error!!!'
    }
    return _CBError(messageError)
  }
}

const useApproveToken = () => {
  // check whether the user has approved the router on the input token
  const onApproveToken = useCallback(
    async (tokenContract, _account, _spender, _amount, _CBSuccess, _CBError, _withUnlimited = false) => {
      // const balanceAllowance = await tokenContract.methods.allowance(_account, _spender).call()
      // const parseBigBalance = new BigNumber(+balanceAllowance)
      // if (parseBigBalance.isLessThan(+_amount)) {
      return approve(tokenContract, _account, _spender, _amount, _CBSuccess, _CBError, _withUnlimited)
      // }

      // return _CBSuccess('Approved')
    },
    []
  )

  const onApproveTokenNFT = useCallback(
    async (tokenContractNFT, _account, _spender, _amount, _CBSuccess, _CBError, _withUnlimited = false) => {
      return approve(tokenContractNFT, _account, _spender, _amount, _CBSuccess, _CBError, _withUnlimited)
    },
    []
  )

  return [onApproveToken, onApproveTokenNFT]
}

export default useApproveToken
