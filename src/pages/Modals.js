import React, { useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import Forms from "./Forms";

function Modals({ isModalOpen, closeModal }) {
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody>
          <Forms />
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button>Accept</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Modals;
