import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Task } from "../interfaces/task";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TaskSchema } from "../schemas/TaskSchema";
import { DateTimePicker } from "./ui/dateTimePicker";
import { AddTask, DeleteTask, GetTask } from "../API/Task";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import UpdateTaskForm from "./updateTaskForm";

function TasksTable({onadd} : {onadd:()=>void}) {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState("")
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
  });

  const onSubmit = async (data: z.infer<typeof TaskSchema>) => {
    console.log(data);

    AddTask(data)
      .then(() => {
        setOpenModal(false);
        toast.success("task added ");
        refetchTasks()
        onadd()
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data.message);
      });
  };

  function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }
  const { data: tasks, refetch: refetchTasks } = useQuery({
    queryKey: ["getTasks"],
    queryFn: () => {
      return GetTask();
    },
  });
  console.log(tasks);

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "employeeId",
      header: "Emploee Name",
      cell: ({ row }) => (
        <div className="text-center capitalize">
          {(row.getValue("employeeId") as { name: string }).name}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <div className="text-center">Description</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium py-5">
            {row.getValue("description")}
          </div>
        );
      },
    },

    {
      accessorKey: "fromTime",
      header: () => <div className="text-center">Start Time</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {formatTimestamp(row.getValue("fromTime"))}
          </div>
        );
      },
    },
    {
      accessorKey: "toTime",
      header: () => <div className="text-center">End Time</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {formatTimestamp(row.getValue("toTime"))}
          </div>
        );
      },
    },
    {
      accessorKey: "_id",
      header: () => "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 justify-center text-primary">
            <Dialog onOpenChange={setOpenEditModal } open={openEditModal}>
              <DialogTrigger asChild>
              <SquarePen onClick={()=>setSelectedId(row.getValue("_id"))} size={24} className="cursor-pointer" stroke="#1b6bfe" />
              </DialogTrigger>
              <DialogContent  className="bg-white w-[60%]">
                <UpdateTaskForm onUpdate={()=>
                  setOpenEditModal(false)
                } id={selectedId} />
              </DialogContent>
            </Dialog>
            <Trash2
              onClick={() => {
                console.log(row.getValue("_id"))
                DeleteTask( row.getValue("_id") ).then(()=>{
                 toast.success("task deleted")
                 refetchTasks()

                });
              }}
              size={24}
              className="cursor-pointer"
              stroke="#1b6bfe"
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: tasks ?? [],
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex justify-end w-[90%] relative mx-auto pt-16">
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="bg-[#1b6bfe]  w-[200px] h-[40px] text-white">
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white w-[60%]">
            <h2 className="text-4xl text-[#1b6bfe] text-center font-bold">
              Add Task
            </h2>
            <Form {...form}>
              <form
                className=" pt-6 pb-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                      onClick={() => setOpenModal(false)}
                      type="button"
                      className="w-[48%] rounded-lg bg-white text-[#1b6bfe] border border-[#1b6bfe] hover:bg-[#1b6bfe] hover:text-white"
                    >
                      Close{" "}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-2xl border bg-background mt-4 w-[90%] mx-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="py-5 bg-[#f0f7ff]">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center py-5 text-[#1b6bfe] font-bold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  There is no tasks
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default TasksTable;
