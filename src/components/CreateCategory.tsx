import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoryState, saveCategoriesToLocalStorage } from "../atoms";

interface IForm {
  category: string;
}

const CreateCategory = () => {
  const setCategories = useSetRecoilState(categoryState);

  const { 
    register , handleSubmit, setValue
  } = useForm<IForm>();
  
  const handleValid = ({ category }: IForm) => {
    setCategories((oldCategories) => {
      const newCategories = [
        ...oldCategories,
        category,
      ];

      saveCategoriesToLocalStorage(newCategories);
      
      return newCategories;
    });

    setValue("category", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input 
        {...register("category", {
          required: "Please write a category"
        })} 
        placeholder="Write a category"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateCategory;
