import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categorySelector, IToDo, saveToDosToLocalStorage, toDoState } from "../atoms";

const ToDo = ({ text, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categorySelector);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const oldToDoIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name };

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
      {categories?.map((aCategory) => (
        <button key={aCategory} name={aCategory} onClick={onClick}>{aCategory}</button>
      ))}
      <button onClick={onDeleteClick}>Delete</button>
    </li>
  );
};

export default ToDo;
