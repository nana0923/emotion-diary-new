import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/Button";
import DiaryItem from "@components/DiaryItem";
import "@components/DiaryList.css";

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  const [sortedType, setSortedType] = useState("lasted");

  // select로 sortedType 변경시 작동하는 함수
  const onChangeSortType = (e) => {
    setSortedType(e.target.value);
  };

  // sortedType 따라 데이터 정렬하는 함수
  const getSortedData = () => {
    return data.toSorted(function (a, b) {
      if (sortedType === "oldsted") {
        return a.createdDate - b.createdDate;
      } else {
        return b.createdDate - a.createdDate;
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <div className="select_box">
          <select onChange={onChangeSortType}>
            <option value="lasted">최신순</option>
            <option value="oldsted">오래된순</option>
          </select>
        </div>

        <Button onClick={() => nav("/new")} text={"새 일기쓰기"} buttonType={"POSITIVE"} />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => {
          return <DiaryItem key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default DiaryList;
