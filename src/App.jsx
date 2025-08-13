import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import HabitForm from "./components/HabitForm/HabitForm";
import HabitDetailsPage from "./components/HabitDetailsPage/HabitDetailsPage";
import MyHabitsPage from "./components/MyHabitsPage/MyHabitsPage";
import * as authService from "./services/authService";
import * as habitService from "./services/habitService";

const App = () => {
  const initialState = authService.getUser();
  const [user, setUser] = useState(initialState);
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHabits = async () => {
      const habitData = await habitService.index();

      setHabits(habitData);
    };
    if (user) fetchAllHabits();
  }, [user]);

  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData);
      setUser(res);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleSignIn = async (formData) => {
    try {
      const res = await authService.signIn(formData);
      setUser(res);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleSearch = async (searchTerm) => {
    const searchResults = await habitService.search(searchTerm);
    setHabits([...searchResults]);
    navigate("/habits");
  };

  const handleAddHabit = async (habitFormData) => {
    const newHabit = await habitService.create(habitFormData);
    setHabits([newHabit, ...habits]);
    navigate("/habits");
  };

  const handleDeleteHabit = async (habitId) => {
    const deletedHabit = await habitService.deleteHabit(habitId);
    setHabits(habits.filter((habit) => habit._id !== deletedHabit._id));
    navigate("/habits");
  };

  const handleUpdateHabit = async (habitId, habitFormData) => {
    const updatedHabit = await habitService.update(habitId, habitFormData);

    setHabits(
      habits.map((habit) =>
        habit._id === updatedHabit._id ? updatedHabit : habit
      )
    );

    navigate(`/habits/${habitId}`);
  };

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
        {user ? (
          // Protected Routes
          <>
            <Route
              path="/habits"
              element={
                <MyHabitsPage
                  handleSearch={handleSearch}
                  habits={habits}
                  handleDeleteHabit={handleDeleteHabit}
                  handleUpdateHabit={handleUpdateHabit}
                />
              }
            />

            <Route
              path="/habits/new"
              element={<HabitForm handleAddHabit={handleAddHabit} />}
            />

            <Route
              path="/habits/:habitId"
              element={
                <HabitDetailsPage handleDeleteHabit={handleDeleteHabit} />
              }
            />

            <Route
              path="/habits/:habitId/edit"
              element={<HabitForm handleUpdateHabit={handleUpdateHabit} />}
            />
          </>
        ) : (
          // Public Routes
          <></>
        )}
        <Route
          path="/sign-up"
          element={<SignUp handleSignUp={handleSignUp} user={user} />}
        />
        <Route
          path="/sign-in"
          element={<SignIn handleSignIn={handleSignIn} user={user} />}
        />
        <Route path="/" element={<h1>Hello World!</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
