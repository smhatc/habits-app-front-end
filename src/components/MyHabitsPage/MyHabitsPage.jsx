import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import HabitList from "../HabitList/HabitList";

const MyHabitsPage = ({
  handleSearch,
  handleDeleteHabit,
  handleUpdateHabit,
  habits,
  user,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <main>
      <h1>My Habits</h1>
      <SearchBar handleSearch={handleSearch} />
      {habits && habits.length > 0 ? (
        <HabitList
          habits={habits}
          handleDeleteHabit={handleDeleteHabit}
          handleUpdateHabit={handleUpdateHabit}
        />
      ) : (
        <p>
          No habits yet. Start by <Link to="/habits/new">creating some</Link>!
        </p>
      )}
    </main>
  );
};
export default MyHabitsPage;
