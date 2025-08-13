import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import HabitList from "../HabitList/HabitList";
import "./MyHabitsPage.css";

const MyHabitsPage = ({
  handleSearch,
  handleDeleteHabit,
  handleUpdateHabit,
  habits,
  user,
  isSearching,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <main>
      <h1 className="myhabits-header">My Habits</h1>
      <div className="myhabits-searchcontainer">
        <SearchBar handleSearch={handleSearch} />
      </div>
      {habits && habits.length > 0 ? (
        <HabitList
          habits={habits}
          handleDeleteHabit={handleDeleteHabit}
          handleUpdateHabit={handleUpdateHabit}
        />
      ) : (
        !isSearching && (
          <p className="myhabits-nohabits">
            No habits yet. Start by <Link to="/habits/new">creating some</Link>!
          </p>
        )
      )}
    </main>
  );
};

export default MyHabitsPage;
