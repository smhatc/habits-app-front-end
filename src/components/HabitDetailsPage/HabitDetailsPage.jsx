import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import * as habitService from "../../services/habitService";
import HabitCard from "../HabitCard/HabitCard";
import HabitLog from "../HabitLog/HabitLog";

const HabitDetailsPage = ({ handleDeleteHabit, user }) => {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

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
      <HabitCard habit={habit} handleDeleteHabit={handleDeleteHabit} />
      <HabitLog habit={habit} />
    </main>
  );
};

export default HabitDetailsPage;
