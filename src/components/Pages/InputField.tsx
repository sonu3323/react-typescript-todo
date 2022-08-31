import React from 'react';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void
}

const InputField: React.FC<Props> = ({ todo, setTodo , addTodo }) => {
  return (
    <div className='container bg-light p-3 text-center mt-3'>
      <div className='d-flex justify-content-cneter'>
        <div className='mb-3 col-6 mx-auto d-flex'>
          <input
            type='email'
            className='form-control input_text'
            id='exampleFormControlInput1'
            placeholder='Enter Todo..'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
          onClick={addTodo}
          className='btn-primary btn-lg ms-3 d-flex'>
            Add <i className='fa-solid fa-plus ms-2'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputField;
