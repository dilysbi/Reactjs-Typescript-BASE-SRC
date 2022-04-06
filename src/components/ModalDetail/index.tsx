import React, { useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { Row, Col, Modal, Spin } from 'antd'
import { get } from 'lodash'
import styled from 'styled-components'
import { Button, Text, TextGradient } from 'widgets/widgets'
import Owner from 'components/Owner'
import InfoNFT from 'components/InfoNFT'
import NftCover from 'components/NftCover'
import Attributes from 'components/AttributesNFT'
import PriceToken from 'components/PriceToken'
import { modalDetailVero, modalBuyVero, modalCancelOffer, modalSendNFT } from '../../state/application/actions'
import { AppState } from '../../state/index'
import Column from '../Column/index'
import { BASE_TOKEN } from '../../constants/index'

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

  .button-cancel {
    color: #ffffff;
    font-style: normal;
    font-weight: normal;
    fontsize: 13px;
    text-align: center;
    whitespace: nowrap;

    height: 40px;
    padding: 7px 18px;

    border-radius: 8px;
    border: unset;
    outline: unset;
    cursor: pointer;

    background: linear-gradient(180deg, #ffc804 20.83%, #ffc702 100%);
    border-radius: 20px;
    box-shadow: 0px 3.64002px 28.2101px #ffc702;

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
  const { account } = useWeb3React()
  const { toggle, data } = useSelector((state: AppState) => state.application.modalDetailVero)
  const { config: githubConfig } = useSelector((state: AppState) => state.application.githubConfig)
  const price = useMemo(() => get(data, 'price'), [data])
  const rateToken = useMemo(() => get(data, 'rateToken'), [data])
  const [loading, setLoading] = useState(false)
  const [errorMess, setErrorMess] = useState<string>('')

  const onClose = useCallback(() => {
    dispatch(modalDetailVero({ toggle: false }))
    setLoading(false)
    setErrorMess('')
  }, [dispatch])

  return (
    <Modal
      key="modalDetail"
      // visible
      visible={toggle}
      centered
      width={800}
      className="modal-detail"
      footer={null}
      onCancel={onClose}
    >
      <ModalContent>
        <Text color="#B1AFCD" fontSize="16px" fontWeight="bold" textTransform="uppercase" marginBottom="40px">
          {BASE_TOKEN.symbol} Detail
        </Text>

        <Row gutter={[40, 20]}>
          <Col xs={24} sm={10} md={10}>
            <NftCover data={data} image={<img src={get(data, 'image')} alt="" />} />
          </Col>
          <Col xs={24} sm={13} md={13}>
            <TextGradient fontSize="20px" fontWeight="bold" padding="0 0 12px">
              {get(data, 'name')}
            </TextGradient>

            <Owner owner={get(data, 'owner')} />
            <InfoNFT attributes={data?.attributes} />

            <Text color="#B1AFCD" fontWeight="500" padding="16px 0 0">
              Attributes
            </Text>
            <Attributes attributes={data?.attributes} />

            {get(data, 'status') === 0 ? (
              ''
            ) : (
              <>
                <Text color="#B1AFCD" fontWeight="500" padding="16px 0 0">
                  Current selling price
                </Text>

                <div style={{ padding: '10px 0 10px' }}>
                  <PriceToken price={price} rate={rateToken?.price} />
                </div>
              </>
            )}

            <Column margin="10px 0 0">
              {errorMess && (
                <Text fontSize="12px" color="red">
                  {errorMess}
                </Text>
              )}
            </Column>

            <ModalActions>
              <Spin spinning={loading}>
                {data?.status === 1 ? (
                  <>
                    {data?.owner === account ? (
                      <button
                        className="button-cancel"
                        type="button"
                        onClick={() => {
                          if (githubConfig?.market?.disableCancel) return
                          onClose()
                          dispatch(modalCancelOffer({ toggle: true, data }))
                        }}
                        disabled={githubConfig?.disableCancel}
                        style={{
                          minWidth: '166px',
                          opacity: githubConfig?.market?.disableCancel ? '0.8' : '1',
                          cursor: githubConfig?.market?.disableCancel ? 'not-allowed' : 'pointer',
                        }}
                      >
                        Cancel Offer
                      </button>
                    ) : (
                      <Button
                        disabled={loading || githubConfig?.market?.disableBuy}
                        onClick={() => {
                          if (loading || githubConfig?.market?.disableBuy) return
                          onClose()
                          dispatch(modalBuyVero({ toggle: true, data }))
                        }}
                        style={{
                          fontSize: '13px',
                          height: '40px',
                          minWidth: '166px',
                          whiteSpace: 'nowrap',
                          background: 'linear-gradient(90deg, #384CFF 0%, #2486F9 0.01%, #3DDCEC 100%)',
                          borderRadius: '20px',
                          boxShadow: '0px 3.64002px 28.2101px #384CFF',
                          opacity: githubConfig?.market?.disableBuy ? '0.8' : '1',
                          cursor: githubConfig?.market?.disableBuy ? 'not-allowed' : 'pointer',
                        }}
                      >
                        Buy Now
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    disabled={loading || githubConfig?.market?.disableSend}
                    onClick={() => {
                      if (loading || githubConfig?.market?.disableSend) return
                      onClose()
                      dispatch(modalSendNFT({ toggle: true, data }))
                    }}
                    style={{
                      fontSize: '13px',
                      height: '40px',
                      minWidth: '166px',
                      whiteSpace: 'nowrap',
                      background: 'linear-gradient(90deg, #384CFF 0%, #2486F9 0.01%, #3DDCEC 100%)',
                      boxShadow: 'rgb(19 76 186) 0px 3.64002px 28.2101px',
                      borderRadius: '20px',
                      opacity: githubConfig?.market?.disableSend ? '0.8' : '1',
                      cursor: githubConfig?.market?.disableSend ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Send NFT
                  </Button>
                )}
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
