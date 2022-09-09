import { DragEvent } from "react";
import { IBoardItems, IBoards } from "../App";

interface TaskItemProps {
  item: IBoardItems;
  board: IBoards;
  setCurrent: (board: IBoards, item: IBoardItems) => void;
  currentBoard: IBoards | null;
  currentItem: IBoardItems | null;
  setBoards: (board: IBoards[]) => void;
  boards: IBoards[];
  deleteItem: (id: number) => void;
}

function TaskItem({
  item,
  board,
  setCurrent,
  currentBoard,
  currentItem,
  setBoards,
  boards,
  deleteItem,
}: TaskItemProps) {
  function dragStartHandler(e: DragEvent<HTMLDivElement>, board: IBoards, item: IBoardItems): void {
    // setCurrentBoard(board);
    // setCurrentItem(item);
    setCurrent(board, item);
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
    e.preventDefault();
    const currentIndex = currentBoard!.items.indexOf(currentItem!); // index of item in board
    currentBoard!.items.splice(currentIndex, 1); // deleting item in current board
    let dropIndex = board.items.indexOf(item); // index of wherever item have to drop
    if (currentIndex <= dropIndex && board.id === currentBoard!.id) {
      dropIndex++;
    }
    board.items.splice(dropIndex, 0, currentItem!); // insert item after drop index
    setBoards(
      boards.map((b) => {
        return b;
      })
    );
    localStorage.setItem("boards", JSON.stringify(boards));
    e.currentTarget.style.boxShadow = "none";
  }
  return (
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
  );
}

export default TaskItem;
