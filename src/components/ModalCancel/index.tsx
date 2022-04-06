import React, { useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Modal, Spin } from 'antd'
import { useWeb3React } from '@web3-react/core'
import { get } from 'lodash'
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import { Button, Text, TextGradient } from 'widgets/widgets'
import { useCreateContract } from 'hooks/useCreateContract'
import NftCover from 'components/NftCover'
import InfoNFT from 'components/InfoNFT'
import PriceToken from 'components/PriceToken'
import AttributesNFT from 'components/AttributesNFT'
import { modalCancelOffer, setFilterToStore } from '../../state/application/actions'
import { AppState } from '../../state/index'
import Column from '../Column/index'
import { TOKEN_CONTRACT } from '../../constants/index'
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

const ModalCancel: React.FC = () => {
  const dispatch = useDispatch()
  const { toastSuccess } = useToast()
  const { account } = useWeb3React()
  const { toggle, data } = useSelector((state: AppState) => state.application.modalCancelOffer)

  const contractMethod = useCreateContract()
  const price = useMemo(() => get(data, 'price'), [data])
  const rateToken = useMemo(() => get(data, 'rateToken'), [data])

  const [loading, setLoading] = useState(false)
  const [errorMess, setErrorMess] = useState<string>('')

  const onClose = useCallback(() => {
    dispatch(modalCancelOffer({ toggle: false }))
    setLoading(false)
    setErrorMess('')
  }, [dispatch])

  const onConfirmCancel = useCallback(() => {
    if (!contractMethod) return setErrorMess('Cannot read contract, please try again later!!!')
    if (!data) return setErrorMess('an error occurred please try again later!!!')

    const params = {
      account,
      tokenId: get(data, 'id'),
      tokenBep20: TOKEN_CONTRACT,
    }

    setErrorMess('')
    setLoading(true)

    contractMethod.methods
      .cancelOrder(params.tokenId, params.tokenBep20)
      .send({ from: params.account })
      .on('receipt', () => {
        setTimeout(() => {
          onClose()
          toastSuccess('Cancel Offer Successfully')
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

    return null
  }, [account, contractMethod, data, dispatch, onClose, toastSuccess])

  return (
    <Modal
      key="modalSaleNFT"
      // visible
      visible={toggle}
      centered
      width={800}
      className="modal-sale"
      footer={null}
      onCancel={onClose}
    >
      <ModalContent>
        <Text color="#B1AFCD" fontSize="16px" fontWeight="bold" textTransform="uppercase" marginBottom="40px">
          Are You Sure To Cancel Offer?
        </Text>

        <Row gutter={[40, 20]}>
          <Col xs={24} sm={10} md={10}>
            <NftCover data={data} image={<img src={get(data, 'image')} alt="" />} />
          </Col>
          <Col xs={24} sm={12} md={12}>
            <TextGradient fontSize="20px" fontWeight="bold" padding="0 0 12px">
              {get(data, 'name')}
            </TextGradient>

            <InfoNFT attributes={data?.attributes} />

            <Text color="#B1AFCD" fontWeight="500" padding="16px 0 0">
              Attributes
            </Text>
            <AttributesNFT attributes={data?.attributes} />

            <Text color="#B1AFCD" fontWeight="500" padding="20px 0 0">
              Current selling price
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
                  onClick={onConfirmCancel}
                  style={{
                    fontSize: '13px',
                    height: '40px',
                    whiteSpace: 'nowrap',
                    background: 'linear-gradient(180deg, #ffc804 20.83%, #ffc702 100%)',
                    borderRadius: '20px',
                    boxShadow: '0px 3.64002px 28.2101px #ffc702',
                  }}
                >
                  Cancel Offer Now!
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
                  borderRadius: '20px',
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

export default React.memo(ModalCancel)
