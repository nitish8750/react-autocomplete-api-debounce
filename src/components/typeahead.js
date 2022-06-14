import { useEffect, useState } from "react";

let p = new Promise((res, rej) => {
  setTimeout(() => {
    res([
      { id: 1, userName: "Nitish" },
      { id: 2, userName: "Nigam" },
      { id: 3, userName: "afsd" }
    ]);
  }, 100);
});

const debounce = (func, wait) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

const TypeAhead = () => {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const loadUsers = async () => {
    const response = await p;
    console.log(response);
  };

  const debounceFetchUser = debounce(async (query, cb) => {
    const res = await p;
    const data = res.filter((user) => {
      return user.userName.toLowerCase().indexOf(query) > -1;
    });
    cb(data);
  }, 1000);

  const onChangeHandler = (input) => {
    if (input.length > 0) {
      debounceFetchUser(input, function (data) {
        setSuggestions(data);
      });
    }
    setText(input);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        className="input"
        value={text}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
      {suggestions &&
        suggestions.map((suggestion, i) => <div>{suggestion.userName}</div>)}
    </div>
  );
};

export default TypeAhead;
