import { useEffect, useState } from "react";
import KanbanBoards from "./components/KanbanBoards";
import Layout from "./components/Layouts";
import Taskform from "./components/Taskform";

import "./App.css";

const initBoards = [
	{
		id: Date.now() + Math.random() * 10,
		title: "TO DO",
		cards: [],
	},
	{
		id: Date.now() + Math.random() * 10,
		title: "In Progress",
		cards: [],
	},
	{
		id: Date.now() + Math.random() * 10,
		title: "Done",
		cards: [],
	},
];

function App() {
	const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("task-data")) || initBoards);
	// const [boards, setBoards] = useState([
	// 	{
	// 		id: Date.now() + Math.random() * 10,
	// 		title: "TO DO",
	// 		cards: [
	// 			{
	// 				id: Date.now() + Math.random(),
	// 				content: "Task 01",
	// 			},
	// 			{
	// 				id: Date.now() + Math.random(),
	// 				content: "Task 02",
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: Date.now() + Math.random() * 10,
	// 		title: "In Progress",
	// 		cards: [
	// 			{
	// 				id: Date.now() + Math.random(),
	// 				content: "INP Task 04",
	// 			},
	// 			{
	// 				id: Date.now() + Math.random(),
	// 				content: "INP Task 05",
	// 			},
	// 			{
	// 				id: Date.now() + Math.random(),
	// 				content: "INP Task 06",
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: Date.now() + Math.random() * 10,
	// 		title: "Done",
	// 		cards: [
	// 			{
	// 				id: Date.now() + Math.random(),
	// 				content: "Done Task 07",
	// 			},
	// 		],
	// 	},
	// ]);
	const [target, setTarget] = useState({
		cardId: "",
		boardId: "",
	});

	useEffect(() => {
		const storedBoards = JSON.parse(localStorage.getItem("task-data"));
		setBoards(storedBoards);
		console.log("storedBoards", storedBoards);
	}, []);

	useEffect(() => {
		console.log("updated Boards", boards);
		localStorage.setItem("task-data", JSON.stringify(boards));
	}, [boards]);

	const handleAddTask = (task) => {
		const boards_deepcopy = JSON.parse(JSON.stringify(boards));

		// New task will always add to TO-DO board
		boards_deepcopy[0].cards.push(task);
		setBoards(boards_deepcopy);
	};

	const handleDragEnter = (cardId, boardId) => {
		// console.log(cardId, boardId);
		setTarget({
			cardId,
			boardId,
		});
	};

	const handleDragEnd = (cardId, boardId) => {
		// console.log(cardId, boardId);
		let src_boardIndx, src_cardIndx, tar_boardIndx, tar_cardIndx;

		// Find the index of the board, where dragged from
		src_boardIndx = boards.findIndex((board) => board.id === boardId);
		if (src_boardIndx < 0) return;

		// Find the index of the card, which is been dragged
		src_cardIndx = boards[src_boardIndx].cards.findIndex((card) => card.id === cardId);
		// console.log("src card indx: ", src_cardIndx);
		if (src_cardIndx < 0) return;

		tar_boardIndx = boards.findIndex((board) => board.id === target.boardId);
		// console.log(tar_boardIndx);
		if (tar_boardIndx < 0) return;

		tar_cardIndx = boards[tar_boardIndx].cards.findIndex((card) => card.id === target.cardId);
		// console.log(tar_cardIndx);
		// if (tar_cardIndx < 0) return;

		const tempBoards = [...boards];
		const tempCard = tempBoards[src_boardIndx].cards?.[src_cardIndx];

		tempBoards[src_boardIndx].cards.splice(src_cardIndx, 1);
		if (tar_cardIndx < 0) {
			tempBoards[tar_boardIndx].cards.push(tempCard);
		} else {
			tempBoards[tar_boardIndx].cards.splice(tar_cardIndx, 0, tempCard);
		}

		setBoards(tempBoards);
	};

	return (
		<div className="App">
			<Layout>
				<Taskform onAddTask={handleAddTask} />
				<KanbanBoards boards={boards} handleDragEnd={handleDragEnd} handleDragEnter={handleDragEnter} />
			</Layout>
		</div>
	);
}

export default App;
