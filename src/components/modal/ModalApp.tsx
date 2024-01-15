import React from 'react';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useStoreCart } from '@/store/storeCart';

interface ModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    children: React.ReactNode;
    title: string;
}

const ModalApp: React.FC<ModalProps> = ({ setIsModalOpen, isModalOpen, children, title }) => {
    const router = useRouter()
    const { setOrder } = useStoreCart();

    const handleCancel = () => {
        setIsModalOpen(false);
        title === 'ORDER SUCCESS' && setTimeout(() => {
            router.push('/');
            setOrder({ products: [] })
        }, 1000);
    }

    return (
        <>
            <Modal
                title={<p className='text-2xl font-medium'>{title}</p>}
                open={isModalOpen}
                onCancel={handleCancel}
                closeIcon={title !== ''}
                footer={null}
            >
                {children}
            </Modal>
        </>
    );
};

export default ModalApp;