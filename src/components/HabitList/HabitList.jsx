import HabitCard from "../HabitCard/HabitCard";

const HabitList = ({ habits, handleUpdateHabit, handleDeleteHabit }) => {
  return (
    <div>
      {habits.map((habit) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          handleDeleteHabit={handleDeleteHabit}
        />
      ))}
    </div>
  );
};

export default HabitList;
