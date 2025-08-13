// MyHabitsPage.jsx
import SearchBar from "../SearchBar/SearchBar";
import HabitList from "../HabitList/HabitList";
import HabitCard from "../HabitCard/HabitCard";

const MyHabitsPage = ({ handleSearch, habits, handleDeleteHabit }) => {
  return (
    <main>
      <h1>My Habits</h1>
      <SearchBar handleSearch={handleSearch} />
      <HabitList habits={habits} handleDeleteHabit={handleDeleteHabit} />
    </main>
  );
};

export default MyHabitsPage;
