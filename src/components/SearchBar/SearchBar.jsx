import { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [formData, setFormData] = useState({
    searchTerm: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearch(formData.searchTerm);
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
    </form>
  );
};

export default SearchBar;
