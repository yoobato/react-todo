import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

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

      // Chagne oldToDo to newToDo
      return [
        ...oldToDos.slice(0, oldToDoIndex),
        newToDo,
        ...oldToDos.slice(oldToDoIndex + 1)
      ]
    });
  };

  // TODO: 삭제 버튼 추가

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
      {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
      {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
    </li>
  );
};

export default ToDo;