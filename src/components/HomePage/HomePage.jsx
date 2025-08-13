import SearchBar from "../SearchBar/SearchBar";
import RecentHabits from "../RecentHabits/RecentHabits";

const HomePage = ({ user, handleSearch, habits, handleDeleteHabit }) => {
  console.log(handleDeleteHabit);
  return (
    <main>
      {user ? (
        <>
          <h1>Welcome back, {user.username}!</h1>
          <SearchBar handleSearch={handleSearch} />
          <RecentHabits habits={habits} handleDeleteHabit={handleDeleteHabit} />
        </>
      ) : (
        <h1>Welcome to the Habit Tracker App!</h1>
      )}
    </main>
  );
};

export default HomePage;
