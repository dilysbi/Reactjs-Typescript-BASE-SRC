import React from 'react'
import styled from 'styled-components'
import { Button } from 'widgets/widgets'
import { useWalletModal } from 'zuki-libs-uikit'
import useAuth from '../../hooks/useAuth'

const ConnectStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .connect-title {
    color: #fff900;
    font-size: 34px;
    font-family: iCiel Cadena;
    font-style: normal;
    font-weight: 900;
    line-height: 1;
    white-space: nowrap;
    text-shadow: -1px 0 #99560f, 0 1px #99560f, 1px 0 #99560f, 0 -1px #99560f;

    margin-bottom: 75px;
  }
  button {
    height: 70px;
    margin: 0;
    margin-top: 40px;
    padding: 2px 60px;
    border-radius: 40px;
    background-color: unset;
    background: ${({ theme }) => theme.colors.gradient};

    span {
      color: #fff;
      font-size: 34px;
      font-family: iCiel Cadena;
      font-style: normal;
      font-weight: 900;
      line-height: 1;
      white-space: nowrap;
      text-shadow: -1px 0 #99560f, 0 1px #99560f, 1px 0 #99560f, 0 -1px #99560f;

      margin-top: -3px;
    }
  }
`

const ConnectContainer: React.FC<{ title?: string; [t: string]: any }> = ({ title, ...props }) => {
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <ConnectStyled {...props}>
      {title && <div className="connect-title">{title}</div>}
      <Button onClick={onPresentConnectModal}>
        <span>Connect</span>
      </Button>
    </ConnectStyled>
  )
}

export default ConnectContainer
