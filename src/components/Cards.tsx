import { DragEvent, useState } from "react";

interface ICard {
  id: number;
  order: number;
  text: string;
}

function Cards() {
  const [cardList, setCardList] = useState<ICard[]>([
    { id: 1, order: 1, text: "КАРТОЧКА 1" },
    { id: 2, order: 2, text: "КАРТОЧКА 2" },
    { id: 3, order: 3, text: "КАРТОЧКА 3" },
    { id: 4, order: 4, text: "КАРТОЧКА 4" },
  ]);
  const [currentCard, setCurrentCard] = useState<null | ICard>(null);
  function dragStartHandler(e: DragEvent<HTMLDivElement>, card: ICard): void {
    setCurrentCard(card);
  }

  function dragEndHandler(e: DragEvent<HTMLDivElement>): void {
    e.currentTarget.style.background = "#fff";
  }

  function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    // if (e.target instanceof HTMLElement) {
    e.currentTarget.style.background = "#ABC";
    // }
  }

  function dropHandler(e: DragEvent<HTMLDivElement>, card: ICard): void {
    e.preventDefault();
    setCardList(
      cardList.map((c: ICard) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard!.order };
        }
        if (c.id === currentCard!.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
    e.currentTarget.style.background = "#fff";
  }

  type sortType = { order: number };

  const sortCards = (a: sortType, b: sortType) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };
  return (
    <>
      {cardList.sort(sortCards).map((card) => (
        <div
          draggable
          className={"card"}
          onDragStart={(e: DragEvent<HTMLDivElement>) => dragStartHandler(e, card)}
          onDragLeave={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
          onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e)}
          onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
          onDrop={(e: DragEvent<HTMLDivElement>) => dropHandler(e, card)}
          key={card.id}
        >
          {card.text}
        </div>
      ))}
    </>
  );
}

export default Cards;
