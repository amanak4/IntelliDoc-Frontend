import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search diagnostic tests..."
          value={searchfield}
          onChange={searchChange}
          className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-primary rounded-full"
        />
      </div>
    </div>
  );
};

export default SearchBox;
