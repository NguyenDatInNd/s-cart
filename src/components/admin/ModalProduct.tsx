import { Modal } from "antd"
export type titleProduct = 'Thêm sản phẩm' | 'Sửa sản phẩm' | 'Xem chi tiết sản phẩm'
export type titleCategory = 'Thêm danh mục' | 'Sửa danh mục' | 'Xem chi tiết danh mục'

interface IModalProduct {
    title: titleProduct | titleCategory;
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