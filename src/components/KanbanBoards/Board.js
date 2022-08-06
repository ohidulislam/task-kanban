import React, { useState } from "react";

const Board = (props) => {
	const { board, handleDragEnd, handleDragEnter } = props;
	const [cardId, setCardId] = useState(null);
	// console.log(board);

	return (
		<div className="kanban-board" onDragEnter={() => handleDragEnter(cardId, board?.id)}>
			<div className="board-title">
				<h3>{props.title}</h3>
			</div>
			<div className="task-list">
				{board?.cards?.map((card) => {
					return (
						<div
							key={card.id}
							className="card"
							onDragEnter={() => {
								handleDragEnter(card?.id, board?.id);
								setCardId(card.id);
							}}
							onDragEnd={() => handleDragEnd(card?.id, board?.id)}
							draggable
						>
							{card.content}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Board;
