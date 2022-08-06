import React, { useState } from "react";

const Taskform = (props) => {
	const [taskData, setTaskData] = useState("");

	const handleFormSubmit = (e) => {
		e.preventDefault();
		props.onAddTask({
			id: Date.now() + Math.random(),
			content: taskData,
		});
		setTaskData("");
	};

	return (
		<div className="taskform">
			<form onSubmit={handleFormSubmit}>
				<input
					value={taskData}
					type="text"
					onChange={(e) => setTaskData(e.target.value)}
					placeholder="Write your task..."
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default Taskform;
