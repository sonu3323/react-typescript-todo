import React from 'react';
import { Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Todo } from './mode';
import SingleTodo from './SingleTodo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className='bg-light '>
      <div className='row text-white '>
        <Droppable droppableId='todo'>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`col-lg-6 col-md-12 col-sm-12 mx-auto ${
                  snapshot.isDraggingOver ? 'shadow-md' : ''
                }`}
              >
                <ul className='list-group  todo_list bg-success'>
                  <h4 className='p-2'> {todos.length > 0 ? `Active Taks ${todos.length}` : "No Tasks"}</h4>
                  {todos.map((todo, index) => (
                    <SingleTodo
                      index={index}
                      todo={todo}
                      key={todo.id}
                      setTodos={setTodos}
                      todos={todos}
                    />
                  ))}
                </ul>
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>

        <Droppable droppableId='removeTodo'>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`col-lg-6 col-md-12 col-sm-12 mx-aut
              ${snapshot.isDraggingOver ? 'shadow-md' : ''}
              `}
            >
              <ul className='list-group  todo_list bg-danger'>
                <h4 className='p-2'>{completedTodos.length > 0 ? `Completed Taks ${completedTodos.length}` : "No Tasks"}</h4>
                {completedTodos.map((todo, index) => (
                  <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={completedTodos}
                    setTodos={setCompletedTodos}
                  />
                ))}
              </ul>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoList;
