import React, { FC, useState } from "react";
// import "./MyCounter.scss";

interface MyCounterProps {}

const MyCounter: FC<MyCounterProps> = (props: MyCounterProps) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>You clicked MyCounter {count} times</p>
      <button
        type="submit"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click MyCounter
      </button>
    </>
  );
};

export default MyCounter;
