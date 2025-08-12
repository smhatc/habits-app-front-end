import { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [formData, setFormData] = useState({
    searchTerm: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError(null); // Clear any previous errors
    const result = await handleSearch(formData.searchTerm);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        name="searchTerm"
        placeholder="Search habits..."
        value={formData.searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
      <div className="error-message">
        {error && <span className="error-icon">!</span>} {error}
      </div>
    </form>
  );
};

export default SearchBar;
