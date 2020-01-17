/**
 * 指数弹窗组件
 * import showModal from '~/components/common/IndexModal'
 * showModal()
 */
import {
  Modal
} from 'ant-design-vue'
import ModalController from './ModalController.jsx'
import './base.less'

const showModal = function () {
  Modal.info({
    content: h => <ModalController />,
    iconType: 'none',
    class: 'index-modal',
    closable: true
  })
}

export default showModal
