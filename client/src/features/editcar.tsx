import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useForm } from "react-hook-form";
import { CarsSchema, CarsUpdateSchema } from "../models/carSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Cars } from "../types";
import axios from "axios";
import { API_URL } from "../utils/routes";
import { QUERYKEYS } from "../query/constants";
import { useModalAction } from "../context/modal.context";
import { toast } from "../components/ui/use-toast";
import { useFetchSingleCar } from "../query/cars-query/get-single-cars";
import { useEffect } from "react";

interface EditCarProps {
  id: number;
}

const EditCar: React.FC<EditCarProps> = ({ id }) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalAction();

  const { data } = useFetchSingleCar({
    id,
  });

  const form = useForm<z.infer<typeof CarsUpdateSchema>>({
    resolver: zodResolver(CarsUpdateSchema),
    values: {
      shippingStatus: data?.shippingStatus,
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("shippingStatus", data.shippingStatus);
    }
  }, [data, form]);

  const { mutate: updateSingleCar, isPending } = useMutation({
    mutationFn: async ({ data, id }: { data: any; id: number }) => {
      const response = await axios.patch(`${API_URL}/cars/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QUERYKEYS.GETALLCARS] });
      closeModal();
      toast({
        title: "Success !!",
        description: "You have successfully updated the car",
      });
    },
  });

  function onUpdate(data: any) {
    updateSingleCar({ data, id });
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onUpdate)}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Update Shipping Status</DialogTitle>
          </DialogHeader>
          <FormField
            control={form.control}
            name="shippingStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipping method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              Update
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditCar;
