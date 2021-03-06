import './styles.css'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'
import { setShowModalNew } from '../../state/application/actions'

const Index = () => {
  const dispatch = useDispatch()
  // const { showModalNew } = useSelector((state) => state.application)
  const showModalNew = false

  const onClickModalNew = () => {
    dispatch(setShowModalNew({ status: false }))
  }

  const isLink = true

  return (
    <>
      <Modal
        key="modalnew"
        width={900}
        visible={showModalNew}
        onCancel={onClickModalNew}
        footer={null}
        className="modal-new"
        centered
      >
        {isLink ? (
          <Link onClick={onClickModalNew} to="/exchange" style={{ cursor: 'pointer' }}>
            <img src="/images/modalNew/modal-new2.jpg" alt="" />
          </Link>
        ) : (
          <a
            // onClick={onClickModalNew}
            style={{ cursor: 'pointer' }}
            href="https://soupsswap.io/#/exchange"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/modalNew/modal-new2.jpg" alt="" />
          </a>
        )}
      </Modal>
    </>
  )
}

export default React.memo(Index)
