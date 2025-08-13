import { useState } from "react";
import { Link } from "react-router-dom";

const HabitCard = ({ habit, handleDeleteHabit }) => {
  const [isDone, setIsDone] = useState(false);

  const handleCheckboxChange = () => {
    setIsDone(!isDone);
  };

  if (!habit) return null;

  return (
    <article>
      <Link to={`/habits/${habit._id}`}>
        <h2>{habit.habitName}</h2>
        <p>{habit.habitDescription}</p>
        <p>{habit.habitFrequency}</p>
        <p>Started on {habit.createdAt}</p>
      </Link>
      <div>
        <form>
          <input
            type="checkbox"
            name="done"
            id={`marked-done-${habit._id}`}
            checked={isDone}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`marked-done-${habit._id}`}>Mark Done</label>
        </form>
        <div>
          <Link to={`/habits/${habit._id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => handleDeleteHabit(habit._id)}>Delete</button>
        </div>
      </div>
    </article>
  );
};

export default HabitCard;
