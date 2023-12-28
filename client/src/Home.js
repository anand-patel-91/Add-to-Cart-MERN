import React, { useEffect, useState } from "react";
import "./home.css";
import cart from "./img/cart1.jpg";

const Home = () => {
    const [text, setText] = useState("");
    const [items, setItems] = useState([]);

    const getItems = () => {
        fetch("http://localhost:5000/list")
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            });
    };

    useEffect(() => {
        getItems();
    }, []);

    const handleChange = (event) => {
        setText(event.target.value.trimStart());
    };

    const handleEnter = (event) => {
        if (event.code === "Enter") {
            handleClick();
        }
    };

    const handleClick = () => {
        if (text !== "") {
            fetch("http://localhost:5000/list", {
                method: "POST",
                body: JSON.stringify({ name: text }),
                headers: {
                    "Content-type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    getItems();
                    setText("");
                });
        } else {
            alert("Input is Empty");
        }
    };

    const handleDoubleClick = (id, name) => {
        if (
            window.confirm(
                `Are you sure you want to delete ${name} from the List?`
            )
        ) {
            fetch(`http://localhost:5000/list/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    getItems();
                });
        }
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            <div className="container">
                <img
                    src={cart}
                    height="416"
                    width="416"
                    title="Shopping Cart"
                    alt="Shopping Cart"
                />
                <input
                    type="text"
                    placeholder="eg. Milk"
                    autoFocus
                    autoComplete="off"
                    onChange={(e) => handleChange(e)}
                    onKeyDown={handleEnter}
                    value={text}
                />
                <button onClick={handleClick}>Add to cart</button>
                <ul id="shopping-list">
                    {items.length
                        ? items.map((item) => (
                              <li
                                  key={item._id}
                                  onDoubleClick={() =>
                                      handleDoubleClick(item._id, item.name)
                                  }>
                                  {item.name}
                              </li>
                          ))
                        : "Nothing here yet!"}
                </ul>
                <footer>
                    <p>*Double Click on an item to remove. </p>
                </footer>
            </div>
            <footer>
                <small>
                    Made by{" "}
                    <a
                        href="https://github.com/anand-patel-91"
                        target="_blank"
                        rel="noreferrer"
                        title="Visit my Github">
                        Anand Patel
                    </a>
                </small>
            </footer>
        </div>
    );
};

export default Home;
