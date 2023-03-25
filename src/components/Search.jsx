import React from "react";
import { FcSearch } from "react-icons/fc";
import { FormGroup, Input } from "reactstrap";

const Search = ({ setSearch, placeholder }) => {
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <FormGroup className="search-room-list mt-2">
      <FcSearch
        style={{ marginLeft: "1rem", position: "absolute" }}
        color="#03665c"
        size="1.5em"
      />
      <Input
        style={{ width: "100%", padding: "1rem 1rem 1rem 3rem" }}
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </FormGroup>
  );
};

export default Search;
