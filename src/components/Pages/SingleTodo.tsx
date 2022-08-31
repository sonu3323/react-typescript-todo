import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Todo } from './mode';
import TodoList from './TodoList';

interface Props {
  index: number;
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}

const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {
  const [editTodo, setEditTodo] = useState<string>('');

  const onEditTodo = (id: number, edit: string): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, [edit]: edit === 'todo' ? editTodo : !todo.isCompleted }
          : todo,
      ),
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter((item) => item.id != id));
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <li className='list-group-item my-1 p-2 mx-2 bg-warning '>
            <div className='d-flex justify-content-between p-2 shadow-sm '>
              <div>
                <h4
                  className={`${
                    todo.isCompleted
                      ? 'fst-italic fw-lighter text-decoration-line-through'
                      : ''
                  }`}
                >
                  {' '}
                  {todo.todo}
                </h4>
              </div>

              <div>
                <i
                  data-bs-toggle='modal'
                  data-bs-target='#exampleModal'
                  className='fa-solid text-primary fa-pen-to-square fa-lg'
                ></i>
                <i
                  onClick={() => deleteTodo(todo.id)}
                  className='fa-solid text-danger fa-trash-can mx-4 fa-lg'
                ></i>
                {todo.isCompleted ? (
                  <i
                    onClick={() => onEditTodo(todo.id, 'isCompleted')}
                    className='fa-solid fa-arrow-rotate-left'
                  ></i>
                ) : (
                  <i
                    onClick={() => onEditTodo(todo.id, 'isCompleted')}
                    className='fa-solid text-success fa-check fa-lg'
                  ></i>
                )}
              </div>
            </div>
          </li>

          {/* <!-- Modal --> */}
          <div
            className='modal model-center fade'
            id='exampleModal'
            // tabindex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    Edit Todo
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <input
                    type='email'
                    className='form-control input_text'
                    id='exampleFormControlInput1'
                    placeholder={todo.todo}
                    onChange={(e) => setEditTodo(e.target.value)}
                  />
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Close
                  </button>
                  <button
                    onClick={() => onEditTodo(todo.id, 'todo')}
                    type='button'
                    className='btn btn-primary'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
