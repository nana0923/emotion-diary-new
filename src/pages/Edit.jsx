import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@layouts/Header";
import Editor from "@components/Editor";
import useDiary from "@hooks/useDiary";
import { DiaryDispatchContext } from "@/App";
import usePagetitle from "@hooks/usePageTitle";
import Container from "@layouts/Container";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  usePagetitle("일기 수정하기");

  const curDiaryItem = useDiary(params.id);

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(input.id, input.createdDate.getTime(), input.emotionId, input.content);
      nav("/", { replace: true });
    }
  };

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  return (
    <>
      <Header title={"일기 수정하기"} />
      <Container>
        <Editor onSubmit={onSubmit} onClickDelete={onClickDelete} initData={curDiaryItem} />
      </Container>
    </>
  );
};

export default Edit;
