import { useState, useEffect } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { DateTime } from "luxon";

import { Column } from "./components/Column/Column";
import { Input } from "./components/Input/Input";

import "./App.css";

export default function App() {

  function roundTimeToQuarters(timeStr) {
    let [hours, minutes] = timeStr.split(':').map(Number);

    if (minutes < 8) {
      minutes = 0;
    } else if (minutes < 23) {
      minutes = 15;
    } else if (minutes < 38) {
      minutes = 30;
    } else if (minutes < 53) {
      minutes = 45;
    } else {
      minutes = 0;
      hours += 1;
    }

    return hours + minutes / 60;
  }
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "UTC",
      time: roundTimeToQuarters(DateTime.now().setZone('UTC').toFormat("HH:mm")),
    },
  ]);

  const [isLoading, setIsLoading] = useState(false)

  const addTask = (title, time) => {
    const isDuplicate = tasks.some((task) => task.title === title);

    if (isDuplicate) {
      return;
    }
    setTasks((tasks) => [
      ...tasks,
      { id: tasks.length + 1, title: title, time: time },
    ]);
  };

  const removeTask = (taskIdToRemove) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskIdToRemove);
    setTasks(updatedTasks);
  };

  const handleSliderChange = (taskTitle, newValue) => {
    setIsLoading(true);
    // const newTime = DateTime.fromFormat(newValue.toString(), "HH:mm");

    // const updatedTasks = tasks.map((task) => {
    //   if (task.title === taskTitle) {
    //     return { ...task, time: newTime.toFormat("HH:mm") };
    //   }

    //   const updatedTime = newTime.setZone('UTC');

    //   return { ...task, time: updatedTime.toFormat("HH:mm") };
    // });
    // setTasks(updatedTasks);
    const newTime = DateTime.fromFormat(newValue.toString(), "HH:mm");

    const updatedTasks = tasks.map((task) => {
      // Convert time from UTC to the timezone of the current task
      const updatedTime = newTime.setZone(task.title);

      return { ...task, time: updatedTime.toFormat("HH:mm") };
    });
    console.log(updatedTasks);
    setTasks(updatedTasks);
    setIsLoading(false);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className="App">
      <h1>Time Zones </h1>
      <Input onSubmit={addTask} />
      {!isLoading && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <Column
            id="toDo"
            tasks={tasks}
            removeTask={removeTask}
            handleSliderChange={handleSliderChange}
          />
        </DndContext>
      )}
    </div>
  );
}
