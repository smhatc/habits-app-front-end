import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as habitService from "../../services/habitService";

const HabitForm = (props) => {
  const { habitId } = useParams();
  const [formData, setFormData] = useState({
    habitName: "",
    habitDescription: "",
    habitFrequency: "Daily",
  });

  useEffect(() => {
    const fetchHabit = async () => {
      const habitData = await habitService.show(habitId);
      setFormData(habitData);
    };
    if (habitId) fetchHabit();
  }, [habitId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (habitId) {
      props.handleUpdateHabit(habitId, formData);
    } else {
      props.handleAddHabit(formData);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{habitId ? "Edit Habit" : "New Habit"}</h1>

        <label htmlFor="habitName-input">Habit Name</label>
        <input
          required
          type="text"
          name="habitName"
          id="habitName-input"
          value={formData.habitName}
          onChange={handleChange}
          placeholder="Enter your habit name"
        />

        <label htmlFor="habitDescription-input">Description</label>
        <textarea
          required
          name="habitDescription"
          id="habitDescription-input"
          value={formData.habitDescription}
          onChange={handleChange}
          placeholder="Describe your habit"
          rows="4"
        />

        <label htmlFor="habitFrequency-input">Frequency</label>
        <select
          required
          name="habitFrequency"
          id="habitFrequency-input"
          value={formData.habitFrequency}
          onChange={handleChange}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>

        <button type="submit">
          {habitId ? "UPDATE HABIT" : "CREATE HABIT"}
        </button>
      </form>
    </main>
  );
};

export default HabitForm;
