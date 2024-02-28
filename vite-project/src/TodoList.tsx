import { useEffect, useState } from "react";

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>([
    { id: 1, text: "Check Email", completed: false },
    { id: 2, text: "Read assigments, get ready for them", completed: false }
  ]);

  const [input, setInput] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleClick = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      const newTodo: Item = { id: Date.now(), text: trimmedInput, completed: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInput('');
    } else {
      alert('Cannot Add empty field!');
    }
  };

  useEffect(() => {
    setInput(''); // Reset input whenever todos change
  }, [todos]);

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="content">
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => handleToggle(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add todo item"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};
