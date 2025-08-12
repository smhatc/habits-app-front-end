import { useState } from "react";
import { Link } from "react-router";

const HabitCard = ({ habit }) => {
  const [isDone, setIsDone] = useState(false);

  const handleCheckboxChange = () => {
    setIsDone(!isDone);
  };

  if (!habit) return null;

  return (
    <Link to={`/habits/${habit._id}`}>
      <article>
        <h2>{habit.habitName}</h2>
        <p>{habit.habitDescription}</p>
        <p>{habit.habitFrequency}</p>
        <p>Started on {habit.createdAt}</p>
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
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default HabitCard;
