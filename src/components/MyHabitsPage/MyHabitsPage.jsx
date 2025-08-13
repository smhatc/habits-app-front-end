import { useEffect } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import HabitList from "../HabitList/HabitList";

const MyHabitsPage = ({ handleSearch, handleDeleteHabit, handleUpdateHabit, habits, user }) => {
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
      <HabitList habits={habits} handleDeleteHabit={handleDeleteHabit} />
    </main>
  );
};
export default MyHabitsPage;
