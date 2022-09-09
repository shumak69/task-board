import { useEffect, useState } from "react";
import "./App.css";
import AddItem from "./components/AddItem";
import BoardItem from "./components/BoardItem";

export interface IBoardItems {
  id: number;
  title: string;
}

export interface IBoards {
  id: number;
  title: string;
  items: IBoardItems[];
}

function App() {
  const [boards, setBoards] = useState<IBoards[]>([]);
  useEffect(() => {
    const getBoards = localStorage.getItem("boards");
    if (!getBoards) {
      const obj: IBoards[] = [
        {
          id: 1,
          title: "Сделать",
          items: [],
        },
        {
          id: 2,
          title: "Проверить",
          items: [],
        },
        {
          id: 3,
          title: "Сделано",
          items: [],
        },
      ];
      localStorage.setItem("boards", JSON.stringify(obj));
    }
    setBoards(JSON.parse(getBoards!));
  }, []);
  const [currentBoard, setCurrentBoard] = useState<null | IBoards>(null);
  const [currentItem, setCurrentItem] = useState<null | IBoardItems>(null);

  function addItem(value: string): void {
    setBoards((board) => {
      const task = { id: +new Date(), title: value };
      const b: IBoards[] = JSON.parse(JSON.stringify(board));
      b[0].items.push(task);

      localStorage.setItem("boards", JSON.stringify(b));
      return b;
    });
  }

  const setCurrent = (board: IBoards, item: IBoardItems) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const deleteItem = (id: number) => {
    setBoards((board: IBoards[]) => {
      const obj = board.map((board) => {
        const newBoards = board.items.filter((item) => item.id !== id);
        board.items = newBoards;
        return board;
      });
      localStorage.setItem("boards", JSON.stringify(obj));
      return obj;
    });
  };

  return (
    <div className="App">
      <AddItem addItem={addItem} />
      <div className="wrapper">
        {boards.map((board) => (
          <BoardItem
            board={board}
            currentBoard={currentBoard}
            deleteItem={deleteItem}
            boards={boards}
            currentItem={currentItem}
            key={board.id}
            setBoards={setBoards}
            setCurrent={setCurrent}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
