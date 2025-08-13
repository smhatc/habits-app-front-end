import { useNavigate, Link } from "react-router";
import HabitCard from "../HabitCard/HabitCard";
import "./RecentHabits.css";

const RecentHabits = ({ habits, handleDeleteHabit }) => {
  const navigate = useNavigate();
  const recentHabits = habits.slice(-4).reverse();

  return (
    <article>
      <h2 className="recenthabits-header">Recent Habits</h2>
      <div className="recenthabits-container">
        {recentHabits.length ? (
          recentHabits.map((habit) => (
            <HabitCard
              key={habit._id}
              habit={habit}
              isHomePage={true}
              handleDeleteHabit={handleDeleteHabit}
              onClick={() => navigate(`/habits/${habit._id}`)}
            />
          ))
        ) : (
          <p className="recenthabits-nohabits">
            No habits yet. Start by <Link to="/habits/new">creating some</Link>!
          </p>
        )}
      </div>
      {recentHabits.length ? (
        <Link className="home-allhabitslink" to={"/habits"}>
          See All Habits
        </Link>
      ) : (
        <></>
      )}
    </article>
  );
};

export default RecentHabits;
