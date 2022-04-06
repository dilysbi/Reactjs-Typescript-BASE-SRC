import React, { useMemo, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Modal, Spin } from 'antd'
import { get } from 'lodash'
import styled from 'styled-components'
import useApproveToken from 'hooks/useApproveToken'
import NftCover from 'components/NftCover'
import InfoNFT from 'components/InfoNFT'
import Owner from 'components/Owner'
import AttributesNFT from 'components/AttributesNFT'
import { Button, Text, TextGradient } from 'widgets/widgets'
import { useCreateContract, useCreateTokenContract } from 'hooks/useCreateContract'
import { useWeb3React } from '@web3-react/core'
import PriceToken from 'components/PriceToken'
import { modalBuyVero, setFilterToStore } from '../../state/application/actions'
import useToast from '../../hooks/useToast'
import { AppState } from '../../state/index'
import Column from '../Column/index'
import { SMART_CONTRACT, BASE_TOKEN } from '../../constants/index'
import { deleteFavorites } from '../../state/favorites/actions'

const ModalContent = styled.div`
  padding: 16px 10px 40px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 30px 32px 40px;
  }
`

const ModalActions = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-around;
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
  .ant-spin-blur {
    border-radius: 30px;
    overflow: hidden;
  }
`

const ModalBuyNFT: React.FC = () => {
  const dispatch = useDispatch()
  const { toastSuccess } = useToast()
  const { account } = useWeb3React()

  const { toggle, data } = useSelector((state: AppState) => state.application.modalBuyVero)
  const price = useMemo(() => get(data, 'price'), [data])
  const rateToken = useMemo(() => get(data, 'rateToken'), [data])

  const [loading, setLoading] = useState(false)
  const [errorMess, setErrorMess] = useState<string>('')

  const onClose = useCallback(() => {
    dispatch(modalBuyVero({ toggle: false }))
    setLoading(false)
    setErrorMess('')
  }, [dispatch])

  const contractMethod = useCreateContract()
  const contractToken = useCreateTokenContract()

  const [approveToken] = useApproveToken()

  const onBuyNow = useCallback(
    async (_contract, _params) => {
      if (!_contract) {
        setErrorMess('Contract is not defined!!!')
        return setLoading(false)
      }

      return _contract.methods
        .fillOrder(_params.tokenId, _params.tokenBep20)
        .send({ from: _params.account, value: _params.amount })
        .on('receipt', () => {
          setTimeout(() => {
            onClose()
            toastSuccess('Buy Successfully')
            dispatch(setFilterToStore({}))
            dispatch(deleteFavorites(data))
          }, 3000)
        })
        .on('error', (error) => {
          let messageError = get(error, 'message', '')
          if (messageError.length > 100) {
            messageError = 'Occurred approve error!!!'
          }
          setErrorMess(messageError)
          setLoading(false)
        })
    },
    [data, dispatch, onClose, toastSuccess]
  )

  const onConfirm = useCallback(() => {
    if (!contractMethod || !contractToken) return setErrorMess('Cannot read contract, please try again later!!!')
    if (!data) return setErrorMess('an error occurred please try again later!!!')

    const amountToPay = (+price * +`1e${BASE_TOKEN.decimals}`).toLocaleString('fullwide', { useGrouping: false })
    const params = {
      account,
      tokenId: get(data, 'id'),
      spender: SMART_CONTRACT,
      tokenBep20: BASE_TOKEN.address,
      amount: '0',
      amountForApprove: amountToPay,
    }

    setErrorMess('')
    setLoading(true)

    approveToken(
      contractToken,
      params.account,
      params.spender,
      params.amountForApprove,
      () => {
        onBuyNow(contractMethod, params)
      },
      (error) => {
        setErrorMess(error)
        setLoading(false)
      }
    )

    return null
  }, [account, approveToken, contractMethod, contractToken, data, onBuyNow, price])

  return (
    <Modal
      key="modalbuyVero"
      // visible
      visible={toggle}
      centered
      width={800}
      className="modal-buy"
      footer={null}
      onCancel={onClose}
    >
      <ModalContent>
        <Text color="#B1AFCD" fontSize="16px" fontWeight="bold" textTransform="uppercase" marginBottom="40px">
          Buy {BASE_TOKEN.symbol}
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

            <InfoNFT attributes={data?.attributes} />

            <Text color="#B1AFCD" fontWeight="500" padding="16px 0 0">
              Attributes
            </Text>
            <AttributesNFT attributes={data?.attributes} />

            <Text color="#B1AFCD" fontWeight="500" padding="16px 0 0">
              Sale price
            </Text>

            <div style={{ padding: '10px 0 10px' }}>
              <PriceToken price={price} rate={rateToken?.price} />
            </div>

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
                  onClick={onConfirm}
                  style={{
                    fontSize: '13px',
                    height: '40px',
                    minWidth: '166px',
                    whiteSpace: 'nowrap',
                    background: 'linear-gradient(90deg, #384CFF 0%, #2486F9 0.01%, #3DDCEC 100%)',
                    borderRadius: '20px',
                    boxShadow: '0px 3.64002px 28.2101px #384CFF',
                  }}
                >
                  Confirm Transaction
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
                  borderRadius: '6px',
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

export default React.memo(ModalBuyNFT)
