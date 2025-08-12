import SearchBar from "../SearchBar/SearchBar";

const MyHabitsPage = ({ handleSearch }) => {
  return (
    <main>
      <h1>My Habits</h1>
      <SearchBar handleSearch={handleSearch} />
    </main>
  );
};
export default MyHabitsPage;
