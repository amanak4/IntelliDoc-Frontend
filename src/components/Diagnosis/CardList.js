import React, { useContext } from "react";
import { Context } from "../..";
import Card from "./Card";

const CardList = ({ tests }) => {
  const { user, setUser, isAuthorized, setIsAuthorized } = useContext(Context);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tests.map((test, i) => (
        <Card
          key={i}
          id={test.id}
          name={test.name}
          img={test.img}
          description={test.description}
          path={isAuthorized ? test.path : "/login"}
        />
      ))}
    </div>
  );
};

export default CardList;
