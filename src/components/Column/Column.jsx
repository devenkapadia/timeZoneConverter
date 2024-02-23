import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Task } from "../Task/Task";
import { DateTime } from "luxon";
import "./Column.css";
import { useEffect } from "react";

export const Column = ({ tasks, removeTask, handleSliderChange }) => {
  useEffect(() => {
    // console.log("TASKS ARE CHANGING --------- ", tasks);
  }, [tasks]);
  return (
    <div className="column">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            time={task.time}
            onRemove={removeTask}
            onSliderChange={(newValue) =>
              handleSliderChange(task.title, newValue)
            } // Pass the callback function to Task
          />
        ))}
      </SortableContext>
    </div>
  );
};
