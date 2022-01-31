import { atom, selector } from "recoil";

// enum에 value를 설정해줄 수 있다. (안하면 0, 1, 2...)
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
};

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
};

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

// load & save with local storage
const TODOS_KEY = "todos";

const loadToDosFromLocalStorage = () => {
  const savedToDosJSON = localStorage.getItem(TODOS_KEY);
  return savedToDosJSON ? JSON.parse(savedToDosJSON as string) : [];
};

export const saveToDosToLocalStorage = (toDos: IToDo[]) => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
};

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: loadToDosFromLocalStorage(),
});

// selector를 사용하면 atom의 output을 변형할 수 있다.
export const toDoSelector = selector<IToDo[]>({
  key: "toDoSelector",
  get: ({ get }) => {
    // get 함수를 사용하면 atom을 selector 내부로 가져올 수 있다.
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
