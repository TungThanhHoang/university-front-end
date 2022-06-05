import React from 'react'
import { useSelector } from 'react-redux';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@windmill/react-ui";
import {
    getQRSelector
} from "../../redux/selector";
export default function StudentQRModal({ isModalOpen, closeModal }) {
    const qrCode = useSelector(getQRSelector);
    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalBody>
                    <div className='font-semibold text-lg mb-2'>
                        Mã QR
                    </div>
                    <div className='flex items-center justify-center'>
                        <div dangerouslySetInnerHTML={{ __html: qrCode[0]?.image_code }} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="hidden sm:block">
                        <Button layout="outline" onClick={closeModal}>
                            Hủy bỏ
                        </Button>
                    </div>
                    <div className="hidden sm:block">
                        <Button type="submit">Lưu thay đổi</Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button block size="large" layout="outline" onClick={closeModal}>
                            Hủy bỏ
                        </Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button type="submit" block size="large">
                            Lưu thay đổi
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}
