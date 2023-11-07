import React from "react";
import { Dialog } from "../components/ui/dialog";
import { useModalAction, useModalState } from "../context/modal.context";
import { CreateNew } from "./createnew";
import EditCar from "./editcar";
import DeleteCar from "./deletecar";

const ManagedModal: React.FC = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      {view === "CREATE_VIEW" && <CreateNew />}
      {view === "EDIT_VIEW" && <EditCar id={data} />}
      {view === "DELETE_VIEW" && <DeleteCar id={data} />}
    </Dialog>
  );
};

export default ManagedModal;
