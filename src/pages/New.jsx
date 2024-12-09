import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@components/Editor";
import Header from "@layouts/Header";
import { DiaryDispatchContext } from "@/App";
import usePagetitle from "@hooks/usePageTitle";
import Container from "@layouts/Container";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();
  usePagetitle("새 일기 쓰기");

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true }); // 뒤로가기를 방지하면서 home페이지로 이동
  };

  return (
    <>
      <Header title={"새 일기 쓰기"} />
      <Container>
        <Editor onSubmit={onSubmit} />
      </Container>
    </>
  );
};

export default New;
