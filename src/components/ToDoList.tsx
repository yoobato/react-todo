import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, currentCategoryState, toDoSelector } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);

  const categories = useRecoilValue(categoryState);
  const [currentCategory, setCurrentCategory] = useRecoilState(currentCategoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCurrentCategory(event.currentTarget.value);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateCategory />
      <select value={currentCategory} onInput={onInput}>
        {categories?.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <hr />
      <CreateToDo />
      <ul>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
