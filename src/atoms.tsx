import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
};

// load & save with local storage
const CATEGORIES_KEY = "categories";
const TODOS_KEY = "todos";

const loadCategoriesFromLocalStorage = () => {
  const savedCategoriesJSON = localStorage.getItem(CATEGORIES_KEY);
  return savedCategoriesJSON ? JSON.parse(savedCategoriesJSON as string) : ["TODO", "DOING", "DONE"];
};

export const saveCategoriesToLocalStorage = (categories: string[]) => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

const loadToDosFromLocalStorage = () => {
  const savedToDosJSON = localStorage.getItem(TODOS_KEY);
  return savedToDosJSON ? JSON.parse(savedToDosJSON as string) : [];
};

export const saveToDosToLocalStorage = (toDos: IToDo[]) => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
};

export const categoryState = atom<string[]>({
  key: "category",
  default: loadCategoriesFromLocalStorage(),
});

export const currentCategoryState = atom<string>({
  key: "current_category",
  default: loadCategoriesFromLocalStorage()[0],
});

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
    const category = get(currentCategoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const categorySelector = selector<string[]>({
  key: "categorySelector",
  get: ({ get }) => {
    const categories = get(categoryState);
    const category = get(currentCategoryState);
    
    return categories.filter((aCategory) => aCategory !== category);
  },
});
