import HabitList from "../HabitList/HabitList";

const MyHabitsPage = ({ habits }) => {
  return (
    <main>
      <h1>My Habits</h1>
      <HabitList habits={habits} />
    </main>
  );
};
export default MyHabitsPage;
