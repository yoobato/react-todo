import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, saveToDosToLocalStorage, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const { 
    register , handleSubmit, setValue
  } = useForm<IForm>();
  
  const handleValid = ({ toDo }: IForm) => {
    // Add New ToDo in original toDos array
    setToDos((oldToDos) => {
      const newToDos = [
        { text: toDo, id: Date.now(), category }, 
        ...oldToDos
      ];

      saveToDosToLocalStorage(newToDos);
      
      return newToDos;
    });

    // submit된 다음에 input 비우기
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input 
        {...register("toDo", {
          required: "Please write a To Do"
        })} 
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateToDo;
