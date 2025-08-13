import { useState } from "react";
import "./SearchBar.css";

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
    <form className="search-bar-form" onSubmit={handleSubmit}>
      <input
        className="search-bar-form-input"
        type="search"
        name="searchTerm"
        placeholder="Search habits..."
        value={formData.searchTerm}
        onChange={handleChange}
      />
      <button className="search-bar-form-submitbtn" type="submit">
        Search
      </button>
      <div className="error-message">
        {error && <span className="error-icon">!</span>} {error}
      </div>
    </form>
  );
};

export default SearchBar;
