import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import * as habitService from "../../services/habitService";
import HabitCard from "../HabitCard/HabitCard";
import HabitLog from "../HabitLog/HabitLog";

const HabitDetailsPage = ({ handleDeleteHabit, user }) => {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);

  const fetchHabit = async () => {
    try {
      const data = await habitService.show(habitId);
      setHabit(data);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHabit = () => {
    fetchHabit();
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchHabit();
  }, [habitId]);

  if (!habit) return <main>Loading...</main>;

  return (
    <main>
      <h1>Habit Details</h1>
      <HabitCard
        habit={habit}
        handleDeleteHabit={handleDeleteHabit}
        onHabitCompleted={refreshHabit}
      />
      <HabitLog habit={habit} />
    </main>
  );
};

export default HabitDetailsPage;
