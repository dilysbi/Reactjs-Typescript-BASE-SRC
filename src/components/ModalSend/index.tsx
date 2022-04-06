import React, { useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { Row, Col, Modal, Spin } from 'antd'
import { get } from 'lodash'
import styled from 'styled-components'
import { isAddress } from '@ethersproject/address'
import useToast from 'hooks/useToast'
import { useCreateTokenContractNFT } from 'hooks/useCreateContract'
import { Button, Text, TextGradient } from 'widgets/widgets'
import PriceToken from 'components/PriceToken'
import Misc from 'helpers/Misc'
import NftCover from 'components/NftCover'
import AttributesNFT from 'components/AttributesNFT'
import Owner from 'components/Owner'
import Column from '../Column/index'
import { AppState } from '../../state/index'
import { BASE_TOKEN, SMART_CONTRACT } from '../../constants/index'
import { modalSendNFT, setFilterToStore } from '../../state/application/actions'
import { deleteFavorites } from '../../state/favorites/actions'

const ModalContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 30px 24px 40px;
`

const CustomInputAmount = styled.div<{ isRequire: boolean }>`
  width: 100%;
  input {
    color: #ffffff;
    font-size: 16px;
    width: 100%;
    height: 50px;
    padding: 6px 14px;
    background: transparent;
    border: ${({ isRequire }) => (isRequire ? '1px solid red' : '1px solid #3B3C4E')};
    border-radius: 16px;

    &:hover,
    &:focus {
      outline: unset;
      border: 2px solid #0531ff;
    }

    ::-webkit-input-placeholder {
      /* Edge */
      color: #646464;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #646464;
    }
    ::placeholder {
      color: #646464;
    }
  }
`
const ModalActions = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-around;
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }

  .button-cancel {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    text-align: center;

    padding: 7px 18px;

    border-radius: 8px;
    border: unset;
    outline: unset;
    cursor: pointer;

    color: #ffffff;
    background: linear-gradient(180deg, #ffc804 20.83%, #ffc702 100%);

    &:active {
      opacity: 0.8;
    }
  }

  .ant-spin-blur {
    border-radius: 30px;
    overflow: hidden;
  }
`

const ModalDetail: React.FC = () => {
  const dispatch = useDispatch()
  const { toastSuccess } = useToast()
  const { account } = useWeb3React()
  const { toggle, data } = useSelector((state: AppState) => state.application.modalSendNFT)
  const price = useMemo(() => get(data, 'price'), [data])
  const rateToken = useMemo(() => get(data, 'rateToken'), [data])
  const [address, setAddress] = useState('')
  const [isRequire, setIsRequire] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [errorMess, setErrorMess] = useState<string>('')

  const onClose = useCallback(() => {
    dispatch(modalSendNFT({ toggle: false }))
    setLoading(false)
    setErrorMess('')
  }, [dispatch])

  const contractMethod = useCreateTokenContractNFT()

  const onSend = useCallback(async (pContract, pMethodName, pParams, pCBSuccess, pCBError) => {
    if (!pContract || !pMethodName) return pCBError('Contract is not defined!!!')
    return pContract[pMethodName](pParams.from, pParams.to, pParams.tokenId)
      .send({ from: pParams.account })
      .on('receipt', async (receipt) => {
        await Misc.sleep(200)
        pCBSuccess(receipt)
      })
      .on('error', (error) => {
        let messageError = get(error, 'message', '')
        if (messageError.length > 100) {
          messageError = 'Occurred approve error!!!'
        }
        pCBError(messageError)
      })
  }, [])

  const handleSendNFT = useCallback(() => {
    if (!address) return setIsRequire(true)
    if (!isAddress(address)) return setErrorMess('Invalid recipient')
    if (!contractMethod) return setErrorMess('Cannot read contract, please try again later!!!')
    if (!data) return setErrorMess('an error occurred please try again later!!!')

    const params = {
      account,
      tokenId: get(data, 'id'),
      spender: SMART_CONTRACT,
      tokenBep20: BASE_TOKEN.address,
      from: account,
      to: address,
      amount: '0',
    }

    setErrorMess('')
    setLoading(true)

    onSend(
      contractMethod.methods,
      'safeTransferFrom',
      params,
      () => {
        onClose()
        toastSuccess('Send NFT Successfully')
        dispatch(setFilterToStore({}))
        dispatch(deleteFavorites(data))
      },
      (errMess) => {
        setErrorMess(errMess)
        setLoading(false)
      }
    )

    return null
  }, [account, address, contractMethod, data, dispatch, onClose, onSend, toastSuccess])

  const onChangeInput = useCallback((_value) => {
    setAddress(_value)
    if (!_value) setIsRequire(true)
    else setIsRequire(false)
  }, [])

  return (
    <Modal
      key="modalDetail"
      // visible
      visible={toggle}
      centered
      width={650}
      className="modal-detail"
      footer={null}
      onCancel={onClose}
    >
      <ModalContent>
        <Text color="#B1AFCD" fontSize="16px" fontWeight="bold" textTransform="uppercase" marginBottom="40px">
          Send {BASE_TOKEN.symbol}
        </Text>

        <Row gutter={[40, 20]}>
          <Col xs={24} sm={10} md={10}>
            <NftCover data={data} image={<img src={get(data, 'image')} alt="" />} />
          </Col>
          <Col xs={24} sm={14} md={14}>
            <TextGradient fontSize="20px" fontWeight="bold" padding="0 0 12px">
              {get(data, 'name')}
            </TextGradient>

            <Owner owner={get(data, 'owner')} />

            <AttributesNFT attributes={data?.attributes} />

            {get(data, 'status') === 0 ? (
              ''
            ) : (
              <>
                <Text color="#B1AFCD" fontWeight="500" padding="20px 0 0">
                  Current selling price
                </Text>

                <PriceToken price={price} rate={rateToken?.price} />
              </>
            )}

            <Text color="#B1AFCD" fontWeight="500" padding="20px 0 0">
              Enter the address
            </Text>

            <Column rowGap="10px" margin="14px 0 0">
              <CustomInputAmount isRequire={isRequire}>
                <input
                  value={address}
                  type="string"
                  placeholder="Enter your address"
                  onChange={(e) => onChangeInput(e.target.value)}
                />
              </CustomInputAmount>
            </Column>

            <Column margin="10px 0 0">
              {errorMess && (
                <Text fontSize="12px" color="red">
                  {errorMess}
                </Text>
              )}
            </Column>

            <ModalActions>
              <Spin spinning={loading}>
                <Button
                  disabled={loading}
                  onClick={handleSendNFT}
                  style={{
                    fontSize: '13px',
                    height: '40px',
                    minWidth: '166px',
                    whiteSpace: 'nowrap',
                    background: 'radial-gradient(64.57% 64.57% at 50.01% 50.01%, rgb(48 134 207) 0%, rgb(51 141 225) 100%)',
                    boxShadow: 'rgb(19 76 186) 0px 3.64002px 28.2101px',
                    borderRadius: '20px',
                  }}
                >
                  Send NFT
                </Button>
              </Spin>
              <Button
                onClick={onClose}
                style={{
                  color: '#9796CF',
                  fontSize: '13px',
                  marginLeft: '16px',
                  height: '40px',
                  whiteSpace: 'nowrap',
                  background: 'transparent',
                  boxShadow: 'unset',
                }}
              >
                Cancel
              </Button>
            </ModalActions>
          </Col>
        </Row>
      </ModalContent>
    </Modal>
  )
}

export default React.memo(ModalDetail)
