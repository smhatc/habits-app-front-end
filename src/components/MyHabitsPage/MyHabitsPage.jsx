import SearchBar from "../SearchBar/SearchBar";
import HabitList from "../HabitList/HabitList";

const MyHabitsPage = ({ handleSearch, habits }) => {
  return (
    <main>
      <h1>My Habits</h1>
      <SearchBar handleSearch={handleSearch} />
      <HabitList habits={habits} />
    </main>
  );
};
export default MyHabitsPage;
