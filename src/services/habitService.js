const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_BASE_URL}/habits`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (habitId) => {
  try {
    const res = await fetch(`${BASE_URL}/${habitId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (habitFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habitFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteHabit = async (habitId) => {
  try {
    const res = await fetch(`${BASE_URL}/${habitId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function update(habitId, habitFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${habitId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habitFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export { index, show, create, deleteHabit, update };
