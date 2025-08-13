import HabitCard from "../HabitCard/HabitCard";
import "./HabitList.css";

const HabitList = ({ habits, handleUpdateHabit, handleDeleteHabit }) => {
  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          handleDeleteHabit={handleDeleteHabit}
          handleUpdateHabit={() => handleUpdateHabit(habit._id)}
        />
      ))}
    </div>
  );
};

export default HabitList;
