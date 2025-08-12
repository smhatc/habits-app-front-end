import HabitCard from "../HabitCard/HabitCard";

const HabitDetailsPage = ({ habit }) => {
  return (
    <main>
      <h1>My Details</h1>
      <HabitCard habit={habit} />
    </main>
  );
};
export default HabitDetailsPage;
