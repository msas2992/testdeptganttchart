'use client'

import Link from "next/link"
import { useEffect, useState } from "react";
import { FrappeGantt } from "frappe-gantt-react";

const Chart = ({ creator, post }) => {

  const [viewMode, setViewMode] = useState("Day");
  const tasks = post.jsonData

  const customPopupHTML = (task) => {
    return (
      <div>
        <h3>{task.name}</h3>
        <p>Start Date: {task.start}</p>
        <p>End Date: {task.end}</p>
        {/* Add more dynamic values here */}
      </div>
    );
  };

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

      <div className="gantt-div mt-7">
        {tasks.length > 0 ? (
          <FrappeGantt
            // customPopupHTML={{customPopupHTML}}
            tasks={tasks}
            viewMode={viewMode}
            // onClick={(task) => console.log("onClick", task)}
            // onDateChange={(task, start, end) => console.log("onDateChange", task, start, end)}
            // onProgressChange={(task, progress) => console.log("onProgressChange", task, progress)}
            // onTasksChange={(tasks) => console.log("onTasksChange", tasks)}
          />
          ) : (
            <div className="empty-gantt-div">
              <h1>No data available</h1>
            </div>
          )}
      </div>
    </section>
  )
}

export default Chart