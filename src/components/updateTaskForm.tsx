import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateTaskSchema } from "../schemas/TaskSchema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DateTimePicker } from "./ui/dateTimePicker";
import { Button } from "./ui/button";
import { GetOneTask, UpdateTask } from "../API/Task";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

function UpdateTaskForm({
  id,
  onUpdate,
}: {
  id: string;
  onUpdate: () => void;
}) {
  console.log(id);
  const form = useForm<z.infer<typeof UpdateTaskSchema>>({
    resolver: zodResolver(UpdateTaskSchema),
  });

  const { data: task, isSuccess } = useQuery({
    queryKey: ["getOneTask"],
    queryFn: () => {
      return GetOneTask(id);
    },
  });
  console.log(task);
  const onSubmit = async (data: z.infer<typeof UpdateTaskSchema>) => {
    console.log(data);
    UpdateTask(data, id)
      .then(() => {
        toast.success("updated successfully");
        onUpdate();
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    if (isSuccess) {
      form.setValue("fromTime", task.fromTime);
      form.setValue("toTime", task.toTime);
      form.setValue("description", task.description);
    }
  }, [isSuccess, id]);

  return (
    <>
      <h2 className="text-4xl text-[#1b6bfe] text-center font-bold">
        Update Task
      </h2>
      <Form {...form}>
        <form className=" pt-6 pb-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormItem className="mb-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label>Description</Label>
                    <FormControl>
                      <Input
                        placeholder="enter task description"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>
            <FormField
              control={form.control}
              name="fromTime"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label>Start Time</Label>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Time */}
            <FormField
              control={form.control}
              name="toTime"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label>End Time</Label>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className={` pt-9 flex justify-between`}>
              <Button
                type="submit"
                className="w-[48%] rounded-lg hover:bg-white bg-[#1b6bfe] text-white border border-[#1b6bfe] hover:text-[#1b6bfe]"
              >
                Add Task{" "}
              </Button>

              <Button
                onClick={() => onUpdate()}
                type="button"
                className="w-[48%] rounded-lg bg-white text-[#1b6bfe] border border-[#1b6bfe] hover:bg-[#1b6bfe] hover:text-white"
              >
                Close{" "}
              </Button>
            </div>
          </div>
        </form>
      </Form>{" "}
    </>
  );
}
export default UpdateTaskForm;
