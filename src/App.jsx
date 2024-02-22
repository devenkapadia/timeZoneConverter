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
import { DateTime } from 'luxon';

import { Column } from "./components/Column/Column";
import { Input } from "./components/Input/Input";

import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "IST",
      time: "10:00"
    },
    {
      id: 2,
      title: "UTC",
      time: "20:00"
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  function appendTime() {
    const updatedData = tasks.map(entry => {
      const currentTime = DateTime.now().setZone(entry.title);
      return { ...entry, time: currentTime.toFormat('HH:mm') };
    });
    setTasks(updatedData);
    setIsLoading(false); // Set loading state to false after appending time
  }

  useEffect(() => {
    appendTime();
  }, []);


  const addTask = (title, time) => {
    const isDuplicate = tasks.some((task) => task.title === title);

    if (isDuplicate) {
      return;
    }
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title: title, time: time }]);
  };

  const removeTask = (taskIdToRemove) => {
    // Filter out the task with the provided taskIdToRemove
    const updatedTasks = tasks.filter((task) => task.id !== taskIdToRemove);
    // Update the state with the updated tasks
    setTasks(updatedTasks);
  };

  const handleSliderChange = (taskTitle, newValue) => {
    setIsLoading(true)
    const newTime = DateTime.fromFormat(newValue.toString(), 'HH:mm');

    const updatedTasks = tasks.map(task => {
      if (task.title === taskTitle) {
        return { ...task, time: newTime.toFormat('HH:mm') };
      }

      const updatedTime = newTime.setZone(task.title);

      return { ...task, time: updatedTime.toFormat('HH:mm') };
    });
    setTasks(updatedTasks);
    console.log(tasks);
    setIsLoading(false)
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
      <h1>Time Zones ✅</h1>
      <Input onSubmit={addTask} />
      {!isLoading && (<DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Column id="toDo" tasks={tasks} removeTask={removeTask} handleSliderChange={handleSliderChange} />
      </DndContext>)}
    </div>
  );
}
