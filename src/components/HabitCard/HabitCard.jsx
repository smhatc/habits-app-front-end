import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import "./HabitCard.css";

const HabitCard = ({
  habit,
  handleDeleteHabit,
  onHabitCompleted,
  isHomePage,
}) => {
  const navigate = useNavigate();

  const [isDone, setIsDone] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // Function to get the time period in milliseconds based on frequency
  const getTimePeriod = (frequency) => {
    switch (frequency) {
      case "Daily":
        return 24 * 60 * 60 * 1000; // 24 hours
      case "Weekly":
        return 7 * 24 * 60 * 60 * 1000; // 7 days
      case "Monthly":
        return 30 * 24 * 60 * 60 * 1000; // 30 days
      default:
        return 24 * 60 * 60 * 1000; // Default to daily
    }
  };

  // Function to check if enough time has passed since last completion
  const canComplete = () => {
    const lastCompletionKey = `habit_${habit._id}_last_completion`;
    const lastCompletion = localStorage.getItem(lastCompletionKey);

    if (!lastCompletion) {
      return true; // Never completed before
    }

    const timePeriod = getTimePeriod(habit.habitFrequency);
    const timeElapsed = Date.now() - parseInt(lastCompletion);

    return timeElapsed >= timePeriod;
  };

  // Check completion status on component mount and set up periodic checks
  useEffect(() => {
    const checkStatus = () => {
      const canCompleteNow = canComplete();
      setIsDisabled(!canCompleteNow);

      // Set isDone based on recent completion
      const lastCompletionKey = `habit_${habit._id}_last_completion`;
      const lastCompletion = localStorage.getItem(lastCompletionKey);

      if (lastCompletion) {
        const timeElapsed = Date.now() - parseInt(lastCompletion);
        const timePeriod = getTimePeriod(habit.habitFrequency);
        setIsDone(timeElapsed < timePeriod);
      } else {
        setIsDone(false);
      }
    };

    checkStatus();

    // Set up interval to check every minute if status should change
    const interval = setInterval(checkStatus, 60000);

    return () => clearInterval(interval);
  }, [habit._id, habit.habitFrequency]);

  const handleCheckboxChange = async (e) => {
    e.preventDefault(); // Prevent navigation to habit details
    e.stopPropagation();

    if (isDisabled) {
      return;
    }

    try {
      // Call backend to create a habit log entry
      const response = await fetch(
        `${import.meta.env.VITE_BACK_END_SERVER_BASE_URL}/habits/${
          habit._id
        }/logs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Store completion time in localStorage
        const lastCompletionKey = `habit_${habit._id}_last_completion`;
        localStorage.setItem(lastCompletionKey, Date.now().toString());

        setIsDone(true);
        setIsDisabled(true);

        // Trigger live reload of habit data
        if (onHabitCompleted) {
          onHabitCompleted();
        }
      } else {
        throw new Error("Failed to mark habit as done");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!habit) return null;

  return (
    <article className="habits-grid-item">
      <Link className="habits-grid-item-link" to={`/habits/${habit._id}`}>
        <h2 className="habits-grid-item-heading">{habit.habitName}</h2>
        <p className="habits-grid-item-para">{habit.habitDescription}</p>
        <p className="habits-grid-item-para">
          {habit.habitFrequency} | Started{" "}
          {new Date(habit.createdAt).toLocaleDateString()}
        </p>
      </Link>
      <form className="habits-grid-item-markdone">
        <input
          className="habits-grid-item-markdone-input"
          type="checkbox"
          name="done"
          id={`marked-done-${habit._id}`}
          checked={isDone}
          disabled={isDisabled}
          onChange={handleCheckboxChange}
        />
        <label
          className="habits-grid-item-markdone-label"
          htmlFor={`marked-done-${habit._id}`}
        >
          {isDisabled && isDone
            ? `Completed (${
                habit.habitFrequency === "Daily"
                  ? "next: tomorrow"
                  : habit.habitFrequency === "Weekly"
                  ? "next: next week"
                  : "next: next month"
              })`
            : "Mark Done"}
        </label>
      </form>
      <div className="habits-grid-item-editdel">
        <button
          className="habits-grid-item-editdel-edit"
          onClick={() => navigate(`/habits/${habit._id}/edit`)}
        >
          Edit
        </button>
        <button
          className="habits-grid-item-editdel-del"
          onClick={() => handleDeleteHabit(habit._id, isHomePage)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default HabitCard;
