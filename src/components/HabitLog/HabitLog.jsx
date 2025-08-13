const HabitLog = ({ habit }) => {
  return (
    <article>
      <h2>Activity History</h2>
      {habit.habitLog.map((log) => (
        <div key={log._id}>
          <img src="/assets/images/checkmark.png" alt="Checkmark Icon" />
          <p>Completed on {new Date(log.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </article>
  );
};

export default HabitLog;
