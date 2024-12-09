import { useEffect, useState } from "react";
import { getStringedDate } from "@utils/get-stringed-date";
import Button from "@components/Button";
import "@components/Editor.css";
import EmotionItem from "@components/EmotionItem";
import { emotionList } from "@utils/constants";
import { useLocation, useNavigate } from "react-router-dom";

const Editor = ({ onSubmit, onClickDelete, initData }) => {
  const nav = useNavigate();
  const location = useLocation();

  const isNewPage = location.pathname === "/new";
  console.log(isNewPage);

  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input type="date" name="createdDate" onChange={onChangeInput} value={getStringedDate(input.createdDate)} />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => {
            return (
              <EmotionItem
                onClick={() =>
                  onChangeInput({
                    target: {
                      name: "emotionId",
                      value: item.emotionId,
                    },
                  })
                }
                key={item.emotionId}
                isSelected={item.emotionId === input.emotionId}
                {...item}
              />
            );
          })}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          placeholder="오늘은 어땠나요?"
          onChange={onChangeInput}
          value={input.content}></textarea>
      </section>
      <section className="button_section">
        <Button text={"취소하기"} onClick={() => nav(-1)} />
        {!isNewPage ? <Button text={"삭제하기"} buttonType={"NEGATIVE"} onClick={onClickDelete} /> : null}
        <Button text={"작성완료"} buttonType={"POSITIVE"} onClick={onClickSubmitButton} />
      </section>
    </div>
  );
};

export default Editor;
