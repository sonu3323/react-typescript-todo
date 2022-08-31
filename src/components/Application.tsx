import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { hot } from 'react-hot-loader';
import './Application.less';
import InputField from './Pages/InputField';
import { Todo } from './Pages/mode';
import TodoList from './Pages/TodoList';

const Application: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(
    [
      {
          "id": 1661931653228,
          "todo": "sdfgsdf",
          "isCompleted": false
      },
      {
          "id": 1661931652372,
          "todo": "sdfgsdfg",
          "isCompleted": false
      },
      {
          "id": 1661931651469,
          "todo": "sdfgsdfg",
          "isCompleted": false
      }
  ]
  );
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (todo)
      setTodos([{ id: Date.now(), todo, isCompleted: false }, ...todos]);

    setTodo('');
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    let { source, destination } = result;

    if (
      source.droppableId == destination.droppableId &&
      source.index == destination.index
    )
      return;

    let add;
    let active = todos;
    let completed = completedTodos;

    if (source.droppableId === 'todo') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === 'todo') {
      add.isCompleted = !add.isCompleted =
      active.splice(destination.index, 0, add);
    } else {
      add.isCompleted = !add.isCompleted
      completed.splice(destination.index, 0, add);
    }

    console.log(add);

    setCompletedTodos(completed);
    setTodos(active);
  };

  console.log(todos);

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='container text-center mt-3 shadow-sm'>
          <h1>Todo App</h1>

          <InputField todo={todo} setTodo={setTodo} addTodo={addTodo} />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        </div>
      </DragDropContext>
    </React.Fragment>
  );
};

export default hot(module)(Application);
