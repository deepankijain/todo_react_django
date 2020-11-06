import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomModal from './components/Modal';
import './App.css';

function App() {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: '',
    description: '',
    completed: false,
  });
  useEffect(() => refreshList(), []);
  const refreshList = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/todos/');
      setTodoList(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const toggle = () => setModal(!modal);
  const handleSubmit = async (item) => {
    toggle();
    if (item.id) {
      await axios.put(`http://localhost:8000/api/todos/${item.id}/`, item);
      refreshList();
      return;
    }
    await axios.post('http://localhost:8000/api/todos/', item);
    refreshList();
  };
  const handleDelete = async (item) => {
    await axios.delete(`http://localhost:8000/api/todos/${item.id}/`);
    refreshList();
  };
  const createItem = () => {
    const item = { title: '', description: '', completed: false };
    setActiveItem(item);
    setModal(!modal);
  };
  const editItem = (item) => {
    setActiveItem(item);
    setModal(!modal);
  };
  const displayCompleted = (status) => {
    if (status) {
      return setViewCompleted(true);
    }
    return setViewCompleted(false);
  };
  const renderTabList = () => {
    return (
      <div className='my-5 tab-list'>
        <span
          onClick={() => displayCompleted(true)}
          className={viewCompleted && 'active'}>
          Complete
        </span>
        <span
          onClick={() => displayCompleted(false)}
          className={!viewCompleted && 'active'}>
          Incomplete
        </span>
      </div>
    );
  };
  const renderItems = () => {
    const newItems = todoList.filter(
      (item) => item.completed === viewCompleted,
    );
    return newItems.map((item) => (
      <li
        key={item.id}
        className='list-group-item d-flex justify-content-between align-items-center'>
        <span
          className={`todo-title mr-2 ${viewCompleted ? 'completed-todo' : ''}`}
          title={item.description}>
          {item.title}
        </span>
        <span>
          <button
            className='btn btn-secondary mr-2'
            onClick={() => editItem(item)}>
            {' '}
            Edit{' '}
          </button>
          <button className='btn btn-danger' onClick={() => handleDelete(item)}>
            Delete{' '}
          </button>
        </span>
      </li>
    ));
  };
  return (
    <main className='content'>
      <h1 className='text-white text-uppercase text-center my-4'>Todo app</h1>
      <div className='row '>
        <div className='col-md-6 col-sm-10 mx-auto p-0'>
          <div className='card p-3'>
            <div className=''>
              <button className='btn btn-primary' onClick={createItem}>
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className='list-group list-group-flush'>{renderItems()}</ul>
          </div>
        </div>
      </div>
      {modal && (
        <CustomModal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      )}
    </main>
  );
}

export default App;
