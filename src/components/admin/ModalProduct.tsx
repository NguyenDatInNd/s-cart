import { Modal } from "antd"
export type title = 'Thêm sản phẩm' | 'Sửa sản phẩm' | 'Xem chi tiết sản phẩm'

interface IModalProduct {
    title: title;
    children: React.ReactNode;
    isModal: boolean;
    oncancel: () => void;
}

const ModalProduct: React.FC<IModalProduct> = ({ title, children, isModal, oncancel }) => {
    return (
        <Modal
            title={title}
            open={isModal}
            centered
            onCancel={oncancel}
            footer
            destroyOnClose
        >
            {children}
        </Modal>
    )
}

export default ModalProduct