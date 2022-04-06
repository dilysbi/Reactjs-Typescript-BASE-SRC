import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { Row, Col, Modal, Spin } from 'antd'
import CurrencyFormat from 'react-currency-format'
import { get } from 'lodash'
import styled from 'styled-components'
import useGetFeeMarket from 'hooks/useGetFeeMarket'
import { useCreateContract, useCreateTokenContractNFT } from 'hooks/useCreateContract'
import { Button, Text, Flex, TextGradient } from 'widgets/widgets'
import LogoLabel from 'components/LogoLabel'
import NftCover from 'components/NftCover'
import InfoNFT from 'components/InfoNFT'
import { deleteFavorites } from 'state/favorites/actions'
import { modalSaleNFT, setFilterToStore } from '../../state/application/actions'
import { AppState } from '../../state/index'
import Column from '../Column/index'
import useToast from '../../hooks/useToast'
import { SMART_CONTRACT, BASE_TOKEN } from '../../constants/index'
import useApproveToken from '../../hooks/useApproveToken'

const ModalContent = styled.div`
  padding: 16px 10px 40px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 30px 32px 40px;
  }
`

const CustomInputAmount = styled.div<{ isRequire: boolean }>`
  width: 100%;
  margin-top: 10px;
  position: relative;

  .input-prefix {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }

  input {
    color: #ffffff;
    font-size: 16px;
    width: 100%;
    height: 50px;
    padding: 6px 20px;
    padding-left: 90px;
    text-align: right;
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

    /* Hide arrow up/down Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
`
const ModalActions = styled.div`
  margin-top: 16px;
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

const Index: React.FC = () => {
  const dispatch = useDispatch()
  const { toastSuccess } = useToast()
  const { account } = useWeb3React()

  const { config: githubConfig } = useSelector((state: AppState) => state.application.githubConfig)
  const { toggle, data } = useSelector((state: AppState) => state.application.modalSaleNFT)

  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [isRequire, setIsRequire] = useState<boolean>(false)
  const [errorMess, setErrorMess] = useState<string>('')

  const contractMethod = useCreateContract()
  const contractMethodNFT = useCreateTokenContractNFT()

  const [fee] = useGetFeeMarket()
  const [, approveNFT] = useApproveToken()

  const onClose = useCallback(() => {
    dispatch(modalSaleNFT({ toggle: false }))
    setLoading(false)
    setErrorMess('')
    setAmount('')
  }, [dispatch])

  const onSaleNow = useCallback(
    async (_contract, _params) => {
      if (!_contract) {
        setErrorMess('Contract is not defined!!!')
        return setLoading(false)
      }

      return _contract.methods
        .placeOrder(_params.tokenId, _params.amount, _params.contractToken)
        .send({ from: _params.account })
        .on('receipt', () => {
          setTimeout(() => {
            onClose()
            toastSuccess('Order Sale Successfully')
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
    [dispatch, onClose, toastSuccess, data]
  )

  const onConfirm = useCallback(() => {
    if (!contractMethod) return setErrorMess('Cannot read contract, please try again later!!!')
    if (!data) return setErrorMess('an error occurred please try again later!!!')
    if (!amount) return setIsRequire(true)

    const amountToPay = (+amount * +`1e${BASE_TOKEN.decimals}`).toLocaleString('fullwide', { useGrouping: false })
    const params = {
      account,
      tokenId: get(data, 'id'),
      spender: SMART_CONTRACT,
      contractToken: BASE_TOKEN.address,
      amount: amountToPay,
    }

    setErrorMess('')
    setLoading(true)

    return approveNFT(
      contractMethodNFT,
      params.account,
      params.spender,
      params.tokenId,
      () => {
        onSaleNow(contractMethod, params)
      },
      (error) => {
        setErrorMess(error)
        setLoading(false)
      }
    )
  }, [account, amount, approveNFT, contractMethod, contractMethodNFT, data, onSaleNow])

  const onChangeInput = useCallback((_value) => {
    if (_value < 0 && _value !== '') _value = _value.replace('-', '')
    setAmount(_value)
    if (!_value) setIsRequire(true)
    else setIsRequire(false)
  }, [])

  return (
    <Modal
      key="modalDetailVero"
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
          Sell Zuki Moba
        </Text>

        <Row gutter={[40, 20]}>
          <Col xs={24} sm={10} md={10}>
            <NftCover data={data} image={<img src={get(data, 'image')} alt="" />} />
          </Col>
          <Col xs={24} sm={14} md={14}>
            <TextGradient fontSize="20px" fontWeight="bold" padding="0 0 12px">
              {get(data, 'name')}
            </TextGradient>

            <InfoNFT attributes={data?.attributes} />
            {/* <AttributesNFT attributes={data?.attributes} /> */}

            <Text color="#B1AFCD" fontWeight="500" padding="20px 0 0">
              Sale price
            </Text>
            <Column rowGap="10px">
              <CustomInputAmount isRequire={isRequire}>
                <span className="input-prefix">
                  <LogoLabel logo={<img src="/images/logos/logo.png" alt="" width="20px" height="20px" />}>
                    {BASE_TOKEN.symbol}
                  </LogoLabel>
                </span>
                <input
                  value={amount}
                  type="number"
                  min={0}
                  placeholder="Enter amount"
                  onChange={(e) => onChangeInput(e.target.value)}
                />
              </CustomInputAmount>
            </Column>

            <Flex marginTop="10px">
              <Column>
                <Text color="#7D7CAF" fontSize="12px">
                  Market fee:
                </Text>
                <Text color="#7D7CAF" fontSize="12px">
                  You will recieved:
                </Text>
              </Column>
              <Column margin="0 0 0 30px">
                <Text color="#70B2FF" fontSize="12px">
                  {fee ?? 'n/a'}%
                </Text>
                <Text color="#70B2FF" fontSize="12px">
                  <CurrencyFormat
                    value={amount ? +amount - (fee / 100) * +amount : 0}
                    displayType="text"
                    thousandSeparator
                    renderText={(value) => value}
                  />
                  &nbsp;{BASE_TOKEN.symbol}
                </Text>
              </Column>
            </Flex>

            <Column margin="10px 0 0">
              {errorMess && (
                <Text fontSize="12px" color="red">
                  {errorMess}
                </Text>
              )}
            </Column>

            <ModalActions>
              <Spin spinning={loading}>
                {githubConfig?.market?.disableSale ? (
                  <Button
                    disabled
                    style={{
                      fontSize: '13px',
                      height: '40px',
                      whiteSpace: 'nowrap',
                      background: '#278ff8',
                      borderRadius: '20px',
                      boxShadow: '0px 3.64002px 28.2101px #278ff8',
                    }}
                  >
                    Confirm Transaction
                  </Button>
                ) : (
                  <Button
                    disabled={loading}
                    onClick={onConfirm}
                    style={{
                      fontSize: '13px',
                      height: '40px',
                      whiteSpace: 'nowrap',
                      background: '#278ff8',
                      borderRadius: '20px',
                      boxShadow: '0px 3.64002px 28.2101px #278ff8',
                    }}
                  >
                    Confirm Transaction
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

export default React.memo(Index)
