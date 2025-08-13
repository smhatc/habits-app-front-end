import SearchBar from "../SearchBar/SearchBar";
import HabitList from "../HabitList/HabitList";

const MyHabitsPage = ({
  handleSearch,
  habits,
  handleDeleteHabit,
  handleUpdateHabit,
}) => {
  return (
    <main>
      <h1>My Habits</h1>
      <SearchBar handleSearch={handleSearch} />
      <HabitList habits={habits} handleDeleteHabit={handleDeleteHabit} />
    </main>
  );
};
export default MyHabitsPage;
