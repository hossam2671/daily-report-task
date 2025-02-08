import { CalendarCheck, CalendarX } from "lucide-react";
import TasksTable from "../components/tasksTable";
import { useQuery } from "@tanstack/react-query";
import { GetDailySummary } from "../API/Task";

function Tasks() {

  const { data: dailySummary , refetch } = useQuery({
    queryKey: ["GetDailySummary"],
    queryFn: () => {
      return GetDailySummary();
    },
  });

  console.log(dailySummary)

  return (
    <div className="bg-[#f7f7f9] min-h-screen">
      <div className="w-[90%] mx-auto pt-20 ">
        <h3 className="text-xl font-bold">Daily Tasks</h3>
        <div className="flex justify-around pt-12">
          <div className="p-4 w-[30%] gap-x-6 flex border rounded-lg">
            <CalendarCheck
              size={80}
              stroke="#1b6bfe"
              className="bg-[#f0f7ff] p-4"
            />
            <div>
              <h4 className="text-3xl font-bold pb-3 text-center">{dailySummary?.remainingHours}</h4>
              <h4 className="text-xl font-bold">Remaing Day Hour</h4>
            </div>
          </div>
          <div className="p-4 w-[30%] gap-x-6 flex border rounded-lg">
            <CalendarX 
              size={80}
              stroke="#1b6bfe"
              className="bg-[#f0f7ff] p-4"
            />
            <div>
              <h4 className="text-3xl font-bold pb-3 text-center">{dailySummary?.totalHours}</h4>
              <h4 className="text-xl font-bold">Total Day Hour</h4>
            </div>
          </div>
        </div>
      </div>
      <TasksTable onadd={()=>{refetch()}} />
    </div>
  );
}

export default Tasks;
