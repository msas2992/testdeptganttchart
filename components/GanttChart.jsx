// import { FrappeGantt } from "frappe-gantt-react";
import { Chart } from "react-google-charts";

const GanttChart = ({ creator, post }) => {

  const tasks = post.jsonData
  let data = []
  let options = []

  if(tasks.length>0){

    const columns = [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ];
    let minDate;
    let maxDate;
    minDate = new Date(tasks[0].start);
    maxDate = new Date(tasks[0].start);

    const rows1 = tasks.map(item => {
      if(item.dependencies === "") item.dependencies = null
      const startDate = new Date(item.start);
      if (startDate < minDate) minDate = startDate
      const endDate = new Date(item.end);
      if (endDate > maxDate) maxDate = endDate

      return [
        item.id.toString(),               
        item.name,                       
        startDate,             
        endDate,               
        null,                            
        parseInt(item.progress),          
        item.dependencies                 
      ];
    });

    data = [columns, ...rows1];

    options = {
      height: 400,
      gantt: {
        trackHeight: 45,
        criticalPathEnabled: false,
        defaultStartDate: new Date(minDate.getTime() - 2 * 24 * 60 * 60 * 1000),
        defaultEndDate: new Date(maxDate.getTime() + 2 * 24 * 60 * 60 * 1000),
        arrow: {
          angle: 50,
          width: 1.5,
          color: 'blue',
          radius: 5,
          length: 5,
          from: 'start',
        },
        timeline: {
          groupByRowLabel: true
        }
      },
    };
  }
  
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">#{post.tag} Gantt Chart by {creator}</span>
      </h1>

      <div
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Project Description
          </span>
          <p className="view_textarea">
            {post.prompt}
          </p>
        </label>
      </div>
      <div className="gantt-div mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        {tasks.length > 0 ? (
          <Chart 
            chartType="Gantt" 
            width="100%" 
            height="100%" 
            data={data} options={options}/>
          // <FrappeGantt
          //   // customPopupHTML={{customPopupHTML}}
          //   tasks={tasks}
          //   viewMode={viewMode}
          //   customPopupHtml={customPopupHtml}
          //   // onClick={(task) => console.log("onClick", task)}
          //   // onDateChange={(task, start, end) => console.log("onDateChange", task, start, end)}
          //   // onProgressChange={(task, progress) => console.log("onProgressChange", task, progress)}
          //   // onTasksChange={(tasks) => console.log("onTasksChange", tasks)}
          // />
          ) : (
            <div className="empty-gantt-div">
              <h1>No data available</h1>
            </div>
          )}
      </div>
    </section>
  )
}

export default GanttChart