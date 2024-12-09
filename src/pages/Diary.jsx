import Header from "@layouts/Header";
import { useParams } from "react-router-dom";
import useDiary from "@hooks/useDiary";
import { getStringedDate } from "@utils/get-stringed-date";
import Viewer from "@components/Viewer";
import usePagetitle from "@hooks/usePageTitle";
import Container from "@layouts/Container";

const Diary = () => {
  const params = useParams();
  usePagetitle(`${params.id}번 일기`);

  const curDiaryItem = useDiary(params.id);
  if (!curDiaryItem) {
    return <div>데이터 로딩중..!</div>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createdDate));

  return (
    <>
      <Header title={`${title}기록`} />
      <Container>
        <Viewer emotionId={emotionId} content={content} />
      </Container>
    </>
  );
};

export default Diary;
