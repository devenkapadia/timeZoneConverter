import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Task } from "../Task/Task";
import "./Column.css";
import { useEffect } from "react";

export const Column = ({ tasks, removeTask, handleSliderChange }) => {
  useEffect(() => {

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
            }
          />
        ))}
      </SortableContext>
    </div>
  );
};
