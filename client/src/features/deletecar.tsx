import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { toast } from "../components/ui/use-toast";
import { useModalAction } from "../context/modal.context";
import { QUERYKEYS } from "../query/constants";
import { API_URL } from "../utils/routes";

interface DeleteCarProps {
  id: number;
}

const DeleteCar: React.FC<DeleteCarProps> = ({ id }) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalAction();

  const { mutate: deleteSingleCar } = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`${API_URL}/cars/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QUERYKEYS.GETALLCARS] });
      closeModal();
      toast({
        title: "Success !!",
        description: "You have successfully deleted the car",
      });
    },
  });

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Do you want to delete ?</DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <Button type="button" onClick={() => deleteSingleCar(id)}>
          Delete
        </Button>
        <Button type="button" variant="outline" onClick={() => closeModal()}>
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteCar;
