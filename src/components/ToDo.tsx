import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, saveToDosToLocalStorage, toDoState } from "../atoms";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const oldToDoIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // as any는 사용을 지양해야함... 그래서 onClick에 파라미터 넣어서 보내는게 좋다.
      const newToDo = { text, id, category: name as any };

      // Change oldToDo to newToDo
      const newToDos = [
        ...oldToDos.slice(0, oldToDoIndex),
        newToDo,
        ...oldToDos.slice(oldToDoIndex + 1) 
      ];

      saveToDosToLocalStorage(newToDos);

      return newToDos;
    });
  };

  const onDeleteClick = () => {
    setToDos((oldToDos) => {
      const oldToDoIndex = oldToDos.findIndex((toDo) => toDo.id === id);

      const newToDos = [
        ...oldToDos.slice(0, oldToDoIndex),
        ...oldToDos.slice(oldToDoIndex + 1)
      ];

      saveToDosToLocalStorage(newToDos);

      return newToDos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
      {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
      {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
      <button onClick={onDeleteClick}>Delete</button>
    </li>
  );
};

export default ToDo;
