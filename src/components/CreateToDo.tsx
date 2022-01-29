import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  // ToDo를 생성하기만 하면 된다. 받아올 필요 X
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const { 
    register , handleSubmit, setValue
  } = useForm<IForm>();
  
  const handleValid = ({ toDo }: IForm) => {
    console.log("add to do", toDo);

    // Add New ToDo in original toDos array
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category }, 
      ...oldToDos
    ]);

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
