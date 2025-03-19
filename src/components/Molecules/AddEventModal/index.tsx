import { Button } from "@/components/Atoms";
import { Map } from "@/components/Atoms/Map";
import React from "react";
import Modal from "react-bootstrap/Modal";
import "leaflet/dist/leaflet.css";

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

const AddEventModal: React.FC<ModalProps> = ({ onHide, ...props }) => {
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Crear evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Map />
      </Modal.Body>
      <Modal.Footer>
        <Button>Guardar</Button>
        <Button onClick={onHide}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export { AddEventModal };
