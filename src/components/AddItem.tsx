import { MouseEvent, useState } from "react";

interface AddItemProps {
  addItem: (value: string) => void;
}

function AddItem({ addItem }: AddItemProps) {
  const [value, setValue] = useState<string>("");

  function addItemTask(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (value.length < 3) {
      alert("Задача имеет меньше 3 символов");
      return;
    } else if (value.length > 45) {
      alert("Слишком много символов");
      return;
    }
    addItem(value);
    setValue("");
  }

  return (
    <form className="form">
      <input
        type="text"
        placeholder="Введите задачу"
        name={"task"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={true}
      />
      <button onClick={(e: MouseEvent<HTMLButtonElement>) => addItemTask(e)}>Добавить</button>
    </form>
  );
}

export default AddItem;
