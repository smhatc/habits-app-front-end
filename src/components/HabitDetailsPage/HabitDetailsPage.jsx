import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as habitService from "../../services/habitService";
import HabitCard from "../HabitCard/HabitCard";

const HabitDetailsPage = () => {
  const { habitId } = useParams();
  const [habit, setHabit] = useState(null);

  useEffect(() => {
    async function fetchHabit() {
      try {
        const data = await habitService.show(habitId);
        setHabit(data);
      } catch (error) {
        console.error("Failed to fetch habit:", error);
      }
    }
    fetchHabit();
  }, [habitId]);

  if (!habit) return <main>Loading...</main>;

  return (
    <main>
      <h1>Habit Details</h1>
      <HabitCard habit={habit} />
    </main>
  );
};

export default HabitDetailsPage;
