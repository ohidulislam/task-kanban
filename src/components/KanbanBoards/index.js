import React from "react";
import Board from "./Board";

const KanbanBoards = (props) => {
	const { boards, handleDragEnd, handleDragEnter } = props;
	return (
		<div className="kanban-boards">
			{boards?.map((board) => (
				<Board
					key={board.id}
					title={board.title}
					board={board}
					handleDragEnd={handleDragEnd}
					handleDragEnter={handleDragEnter}
				/>
			))}
		</div>
	);
};

export default KanbanBoards;
