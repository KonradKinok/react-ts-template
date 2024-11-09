import "./Searchbar.scss";
import { useState, ChangeEvent, MouseEvent } from "react";

interface SearchbarProps {
  handleSearch: (query: string) => void;
}

export function Searchbar({ handleSearch }: SearchbarProps) {
  const [query, setQuery] = useState<string>("");

  const clickButtonSearch = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSearch(query);
  };

  const handleInputSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  return (
    <header className="searchbar">
      <form className="searchForm">
        <button
          type="submit"
          className="searchForm-button"
          onClick={clickButtonSearch}
        >
          {/* <svg className="" width="16" height="16">
            <use href={`${icon}#icon-search`} />
          </svg> */}
        </button>
        <input
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          name="query"
          onChange={handleInputSearchChange}
        />
      </form>
    </header>
  );
}
