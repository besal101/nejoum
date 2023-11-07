import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useForm } from "react-hook-form";
import { CarsSchema } from "../models/carSchema";
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

export function CreateNew() {
  const form = useForm<z.infer<typeof CarsSchema>>({
    resolver: zodResolver(CarsSchema),
  });

  const queryClient = useQueryClient();
  const { closeModal } = useModalAction();

  const { mutate: createCars, isPending } = useMutation({
    mutationFn: async (data: Cars) => {
      const response = await axios.post(`${API_URL}/cars`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QUERYKEYS.GETALLCARS] });
      closeModal();
      toast({
        title: "Success !!",
        description: "You have successfully created new car",
      });
    },
  });

  function onSubmit(data: any) {
    createCars(data);
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Create New Car</DialogTitle>
          </DialogHeader>
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make</FormLabel>
                <FormControl>
                  <Input id="make" className="col-span-3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input id="model" className="col-span-3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input
                    id="year"
                    type="number"
                    className="col-span-3"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vin</FormLabel>
                <FormControl>
                  <Input id="vin" className="col-span-3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
