import TodoList from "./TodoList";
import { TodoInput } from "./TodoInput";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../Redux/action";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import Pagination from "./Pagination";

const Todo = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [perPageInput, setPerPageInput] = useState(1);
  const [perPage, setPerPage] = useState(1);

  const { todos } = useSelector((state) => state);

  const handleAdd = (text) => {
    const action = addTodo({
      title: text,
      status: false,
      id: uuid()
    });
    dispatch(action);
  };

  const changePageTo = (num) => {
    if (num <= 1) {
      setPage(1);
      return;
    }
    setPage(num);
  };

  const handlePerPage = () => {
    setPerPage(perPageInput);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <input
        type="number"
        placeholder="How many content you want perPage"
        onChange={(e) => setPerPageInput(e.target.value)}
      />
      <button onClick={handlePerPage}>SetPerpage</button>
      <TodoInput onAdd={handleAdd} />
      <TodoList allFunc={[changePageTo, perPage, page, setPage]} />
      <Pagination
        currentPage={page}
        onClickCallback={(page) => changePageTo(page)}
        total={Math.ceil(todos.length / perPage)}
      />
    </div>
  );
};

export default Todo;
