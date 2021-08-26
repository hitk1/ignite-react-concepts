import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { useRef } from 'react'

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    if (!newTaskTitle)
      return

    else {
      setTasks([...tasks,
      {
        id: uuid(),
        title: newTaskTitle,
        isComplete: false
      }])
    }

    if (inputRef.current) {
      inputRef.current.value = ''
      setNewTaskTitle('')
      inputRef.current.focus()
    }
  }

  function handleToggleTaskCompletion(id: string) {
    const foundTask = tasks.find(item => item.id === id)

    if (foundTask)
      foundTask.isComplete = !foundTask?.isComplete

    tasks.splice(tasks.findIndex(item => item.id === id), 1, foundTask!)

    setTasks(tasks.slice())
  }

  function handleRemoveTask(id: string) {
    tasks.splice(tasks.findIndex(item => item.id === id), 1)
    setTasks(tasks.slice())
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}