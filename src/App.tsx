import { DragEvent, MouseEvent, useState } from "react";
import "./App.css";

interface IBoardItems {
  id: number;
  title: string;
}

interface IBoards {
  id: number;
  title: string;
  items: IBoardItems[];
}

function App() {
  const [boards, setBoards] = useState<IBoards[]>([
    {
      id: 1,
      title: "Сделать",
      items: [
        { id: 1, title: "Пойти в магазин" },
        { id: 2, title: "Выкинуть мусор" },
        { id: 3, title: "Покушать" },
      ],
    },
    {
      id: 2,
      title: "Проверить",
      items: [
        { id: 4, title: "Код ревью" },
        { id: 5, title: "Задача на факториал" },
        { id: 6, title: "Задачи на фибоначчи" },
      ],
    },
    {
      id: 3,
      title: "Сделано",
      items: [
        { id: 7, title: "Снять видео" },
        { id: 8, title: "Смонтировать" },
        { id: 9, title: "Отрендерить" },
      ],
    },
  ]);
  const [currentBoard, setCurrentBoard] = useState<null | IBoards>(null);
  const [currentItem, setCurrentItem] = useState<null | IBoardItems>(null);
  const [value, setValue] = useState<string>("");
  function dragStartHandler(e: DragEvent<HTMLDivElement>, board: IBoards, item: IBoardItems): void {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e: DragEvent<HTMLDivElement>): void {
    e.currentTarget.style.boxShadow = "none";
  }

  function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    if (e.currentTarget.className === "item") {
      e.currentTarget.style.boxShadow = "0 2px 3px gray";
    }
  }

  function dragLeaveHandler(e: DragEvent<HTMLDivElement>): void {
    e.currentTarget.style.boxShadow = "none";
  }

  function dropHandler(e: DragEvent<HTMLDivElement>, board: IBoards, item: IBoardItems): void {
    console.log(board.items);
    e.preventDefault();
    const currentIndex = currentBoard!.items.indexOf(currentItem!); // index of item in board
    currentBoard!.items.splice(currentIndex, 1); // deleting item in current board
    const dropIndex = board.items.indexOf(item); // index of wherever item have to drop
    board.items.splice(dropIndex, 0, currentItem!); // insert item after drop index
    setBoards(
      boards.map((b) => {
        // if (b.id === board.id) {
        //   return board;
        // }
        // if (b.id === currentBoard!.id) {
        //   return currentBoard!;
        // }
        return b;
      })
    );
    e.currentTarget.style.boxShadow = "none";
  }
  function dropCardHandler(e: DragEvent<HTMLDivElement>, board: IBoards): void {
    const currentIndex = currentBoard!.items.indexOf(currentItem!);
    if (e.target instanceof HTMLElement && !e.target.classList.contains("item")) {
      board.items.push(currentItem!);
      currentBoard!.items.splice(currentIndex, 1);
      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }
          if (b.id === currentBoard!.id) {
            return currentBoard!;
          }
          return b;
        })
      );
    }
  }

  function addItem(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (value.length < 3) {
      alert("Задача имеет меньше 3 символов");
      return;
    } else if (value.length > 45) {
      alert("Слишком много символов");
      return;
    }
    setBoards((board) => {
      const task = { id: +new Date(), title: value };
      const b: IBoards[] = JSON.parse(JSON.stringify(board));
      b[0].items.push(task);

      return b;
    });
    setValue("");
  }

  function deleteItem(id: number): void {
    // const newBoards = boards.map((board) => {
    //   board.items.map(item => )
    //   return board;
    // });
    setBoards((board) =>
      board.map((board) => {
        const newBoards = board.items.filter((item) => item.id !== id);
        board.items = newBoards;
        return board;
      })
    );
  }

  return (
    <div className="App">
      <form className="form">
        <input
          type="text"
          placeholder="Введите задачу"
          name={"task"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required={true}
        />
        <button onClick={(e: MouseEvent<HTMLButtonElement>) => addItem(e)}>Добавить</button>
      </form>
      <div className="wrapper">
        {boards.map((board) => (
          <div
            className="board"
            key={board.id}
            onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
            onDrop={(e: DragEvent<HTMLDivElement>) => dropCardHandler(e, board)}
          >
            <div className="board__title">{board.title}</div>
            {board.items.map((item) => (
              <div className="item-wrapper" key={item.id}>
                <div
                  className="item"
                  draggable
                  onDragStart={(e: DragEvent<HTMLDivElement>) => dragStartHandler(e, board, item)}
                  onDragLeave={(e: DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
                  onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                  onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                  onDrop={(e: DragEvent<HTMLDivElement>) => dropHandler(e, board, item)}
                >
                  {item.title}
                </div>
                <div className="close" onClick={() => deleteItem(item.id)}>
                  ✖
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
