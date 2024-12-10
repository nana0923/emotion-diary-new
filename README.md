# 감정 일기장 프로젝트 Upgrade 😎

감정 일기장 프로젝트입니다.
오늘의 감정을 골라보세요.

한입으로 잘라먹는 리액트 최종 프로젝트 감정일기장에 기능을 추가하고 감정 디자인을 Upgrade하였습니다.

![thumbnail.png](public\thumbnail.png)

## Upgrade 내역

1. firebase Authentication를 이용하여 로그인, 회원가입, 로그아웃 기능 구현
2. Loading (Spinner) 추가, Loading,User 상태를 Context API로 관리
3. Firebase로 회원별 CRUD구현하기
4. 기존에 5개로 표현하던 감정을 9개의 다양한 감정으로 바꿔서 디자인 Upgrade
5. firebase 호스팅 하고 배포

### 자세한 Upgrade 과정 설명은 [velog](https://velog.io/@nah0923/series/%EA%B0%90%EC%A0%95%EC%9D%BC%EA%B8%B0%EC%9E%A5Upgrade)에 적어놨습니다.

### 배포 사이트: https://emotion-diary-new.web.app/

## 스택 & 라이브러리 선정

vite / React / firebase(추가구현)

스타일 : css

배포 : firebase

## 프로젝트 설치 및 실행 방법

이 프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따라 주세요.

1. 저장소를 클론합니다:

   ```bash
   git clone https://github.com/nana0923/emotion-diary-new.git
   ```

2. 프로젝트 디렉토리로 이동합니다:

   ```bash
   cd emotion-diary-new
   ```

3. 의존성 패키지를 설치합니다:

   ```bash
   npm install
   ```

4. 앱을 시작하려면 아래 명령어를 실행하세요:

   ```bash
   npm run dev
   ```

## 참고 자료

- https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%EB%A6%AC%EC%95%A1%ED%8A%B8
- https://github.com/winterlood/onebite-react-v2/tree/main/section12/chapter18
