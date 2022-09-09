import { DragEvent } from "react";
import { IBoardItems, IBoards } from "../App";
import TaskItem from "./TaskItem";

interface BoardItemProps {
  board: IBoards;
  setCurrent: (board: IBoards, item: IBoardItems) => void;
  currentBoard: IBoards | null;
  currentItem: IBoardItems | null;
  setBoards: (board: IBoards[]) => void;
  boards: IBoards[];
  deleteItem: (id: number) => void;
}

function BoardItem({
  board,
  currentBoard,
  currentItem,
  setCurrent,
  boards,
  deleteItem,
  setBoards,
}: BoardItemProps) {
  function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    if (e.currentTarget.className === "item") {
      e.currentTarget.style.boxShadow = "0 2px 3px gray";
    }
  }

  function dropCardHandler(e: DragEvent<HTMLDivElement>, board: IBoards): void {
    const currentIndex = currentBoard!.items.indexOf(currentItem!);
    if (e.target instanceof HTMLElement && !e.target.classList.contains("item")) {
      board.items.push(currentItem!);
      currentBoard!.items.splice(currentIndex, 1);
      setBoards(
        boards.map((b) => {
          return b;
        })
      );
    }
    localStorage.setItem("boards", JSON.stringify(boards));
  }
  return (
    <div
      className="board"
      key={board.id}
      onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
      onDrop={(e: DragEvent<HTMLDivElement>) => dropCardHandler(e, board)}
    >
      <div className="board__title">{board.title}</div>
      {board.items.map((item) => (
        <TaskItem
          board={board}
          currentBoard={currentBoard}
          item={item}
          currentItem={currentItem}
          setCurrent={setCurrent}
          key={item.id}
          setBoards={setBoards}
          boards={boards}
          deleteItem={deleteItem}
        />
      ))}
    </div>
  );
}

export default BoardItem;
