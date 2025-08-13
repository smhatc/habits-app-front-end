import { useNavigate, Link } from "react-router";
import HabitCard from "../HabitCard/HabitCard";

const RecentHabits = ({ habits, handleDeleteHabit }) => {
  const navigate = useNavigate();
  const recentHabits = habits.slice(-4).reverse();

  if (!recentHabits.length) {
    return (
      <article>
        <h2>Recent Habits</h2>
        <p>
          No habits yet. Start by <Link to="/habits/new">creating some</Link>!
        </p>
      </article>
    );
  }

  return (
    <article>
      <h2>Recent Habits</h2>
      <div>
        {recentHabits.map((habit) => (
          <HabitCard
            key={habit._id}
            habit={habit}
            isHomePage={true}
            handleDeleteHabit={handleDeleteHabit}
            onClick={() => navigate(`/habits/${habit._id}`)}
          />
        ))}
      </div>
    </article>
  );
};

export default RecentHabits;
