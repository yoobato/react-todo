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

// TODO: localStorage 사용해서 toDoState 저장해놨다가, 어플리케이션 실행시 불러오자.

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

// selector를 사용하면 atom의 output을 변형할 수 있다.
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    // get 함수를 사용하면 atom을 selector 내부로 가져올 수 있다.
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
