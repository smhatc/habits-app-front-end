import HabitCard from "../HabitCard/HabitCard";

const HabitList = ({ habits }) => {
  return (
    <div>
      {habits.map((habit) => (
        <HabitCard key={habit._id} habit={habit} />
      ))}
    </div>
  );
};

export default HabitList;
