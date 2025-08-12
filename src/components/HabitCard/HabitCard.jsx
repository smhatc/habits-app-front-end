import { Link } from "react-router-dom";

const HabitCard = ({ habit }) => {
  if (!habit) return null;
  // console.log(habit);
  return (
    <Link to={`/habits/${habit._id}`}>
      <article>
        <h2>{habit.habitName}</h2>
        <p>{habit.habitDescription}</p>
        <p>{habit.habitFrequency}</p>
        <p>Started on {habit.createdAt}</p>
        <div>
          <form>
            <input type="checkbox" name="done" id="marked-done" />{" "}
            <label htmlFor="marked-done">Mark Done</label>
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
