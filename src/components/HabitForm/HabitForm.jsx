import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as habitService from "../../services/habitService";
import "./HabitForm.css";

const HabitForm = ({ handleAddHabit, handleUpdateHabit }) => {
  const { habitId } = useParams();

  const [formData, setFormData] = useState({
    habitName: "",
    habitDescription: "",
    habitFrequency: "Daily",
  });

  let formIsInvalid = true;

  if (
    formData.habitName &&
    formData.habitDescription &&
    formData.habitFrequency
  ) {
    formIsInvalid = false;
  }

  useEffect(() => {
    const fetchHabit = async () => {
      const habitData = await habitService.show(habitId);
      setFormData(habitData);
    };
    if (habitId) fetchHabit();
  }, [habitId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (habitId) {
      handleUpdateHabit(habitId, formData);
    } else {
      handleAddHabit(formData);
    }
  };

  return (
    <main>
      <h1 className="habitform-header">
        {habitId ? "Edit Habit" : "Add Habit"}
      </h1>
      <form className="habit-form" onSubmit={handleSubmit}>
        <label className="habit-form-label" htmlFor="habitName-input">
          Habit Name
        </label>
        <input
          className="habit-form-input"
          type="text"
          name="habitName"
          id="habitName-input"
          value={formData.habitName}
          onChange={handleChange}
          placeholder="Enter a habit name"
        />
        <label className="habit-form-label" htmlFor="habitDescription-input">
          Habit Description
        </label>
        <textarea
          className="habit-form-input"
          name="habitDescription"
          id="habitDescription-input"
          value={formData.habitDescription}
          onChange={handleChange}
          placeholder="Describe your habit"
          rows="5"
        />
        <label className="habit-form-label" htmlFor="habitFrequency-input">
          Habit Frequency
        </label>
        <select
          className="habit-form-input"
          name="habitFrequency"
          id="habitFrequency-input"
          value={formData.habitFrequency}
          onChange={handleChange}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        <button
          className="habit-form-submitbtn"
          type="submit"
          disabled={formIsInvalid}
        >
          {habitId ? "Edit Habit" : "Add Habit"}
        </button>
      </form>
    </main>
  );
};

export default HabitForm;
