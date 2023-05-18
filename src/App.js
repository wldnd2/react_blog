import "./App.css";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState(["한식 맛집", "일식 맛집", "양식 맛집"]);
  const [like, setLike] = useState([0, 0, 0]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [t, setT] = useState("");

  const openModal = (index) => {
    setShowModal(!showModal);
    setSelectedItemIndex(index);
  };

  const handleLikeClick = (index) => {
    setLike((prevLike) => {
      const temp = [...prevLike];
      temp[index] += 1;
      return temp;
    });
  };

  const handleDeleteClick = (index) => {
    setTitle((prevTitle) => {
      const temp = [...prevTitle];
      temp.splice(index, 1);
      return temp;
    });
  };

  const renderList = () => {
    return title.map((item, index) => (
      <div className="list" key={index}>
        <h4 onClick={() => openModal(index)}>
          {item} <span onClick={() => handleLikeClick(index)}>🔥</span>
          {like[index]}
        </h4>
        <span>5/14 발행</span>
        <button onClick={() => handleDeleteClick(index)}>클릭하면 삭제됨</button>
      </div>
    ));
  };

  return (
    <div className="App">
      <div className="black-nav">
        <div>blog</div>
      </div>
      {renderList()}
      {showModal && selectedItemIndex !== null && (
        <Modal title={title[selectedItemIndex]} />
      )}
      <input type="text" onChange={(e) => setT(e.target.value)} />
      <button onClick={() => {
        const copy = [...title];
        copy.unshift(t);
        setTitle(copy);
        const temp = [...like];
        temp.unshift(0);
        setLike(temp);
      }}>submit</button>
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.title}</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

export default App;
