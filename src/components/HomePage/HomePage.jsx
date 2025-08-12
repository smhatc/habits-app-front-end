import SearchBar from "../SearchBar/SearchBar";
import RecentHabits from "../RecentHabits/RecentHabits";

const HomePage = ({ user, handleSearch, habits }) => {
  return (
    <main>
      {user ? (
        <>
          <h1>Welcome back, {user.username}!</h1>
          <SearchBar handleSearch={handleSearch} />
          <RecentHabits habits={habits} />
        </>
      ) : (
        <h1>Welcome to the Habit Tracker App!</h1>
      )}
    </main>
  );
};

export default HomePage;
