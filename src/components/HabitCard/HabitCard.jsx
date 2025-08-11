import { Link } from "react-router";

const HabitCard = ({ habit }) => {
  return (
    <Link to={`/habits/${habit._id}`}>
      <article>
        <h2>{habit.habitName}</h2>
        <p>{habit.habitDescription}</p>
        <p>{habit.habitFrequency}</p>
        <p>Started on: {habit.createdAt}</p>
      </article>
    </Link>
  );
};

export default HabitCard;
