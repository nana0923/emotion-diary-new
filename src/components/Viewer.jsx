import { getEmotionImage } from "@utils/get-emotion-images";
import { emotionList } from "@utils/constants";
import "@components/Viewer.css";
import Button from "@components/Button";
import { useNavigate, useParams } from "react-router-dom";

const Viewer = ({ emotionId, content }) => {
  const emotionItem = emotionList.find((item) => String(item.emotionId) === String(emotionId));

  const params = useParams();
  const nav = useNavigate();

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img src={getEmotionImage(emotionId)} />
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
      <section className="button_section">
        <Button text={"뒤로가기"} onClick={() => nav(-1)} />
        <Button text={"수정하기"} onClick={() => nav(`/edit/${params.id}`)} />
      </section>
    </div>
  );
};

export default Viewer;
