// Search.tsx
import React from "react";
import { useParams } from "react-router-dom";

const Search: React.FC = () => {
  const { title } = useParams<{ title: string }>();

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Search; // <-- importante: usar export default
