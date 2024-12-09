import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/App";
import "@layouts/Header.css";

import HomeIcon from "/src/assets/icon_home_B.svg";
import MenuIcon from "/src/assets/icon_menu_B.svg";
import CloseIcon from "/src/assets/icon_close_B.svg";

import LogoutButton from "../components/LogoutButton";

const Header = ({ title, leftChild, rightChild }) => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="HeaderWrap">
      {/* 홈 버튼 */}
      <div className="logoArea">
        <Link to="/">
          <img src={HomeIcon} />
        </Link>
      </div>

      {/* 가운데 제목 영역 */}
      <div className="titleArea">
        <div className="headerLeft">{leftChild}</div>
        <div className="headerCenter">{title}</div>
        <div className="headerRight">{rightChild}</div>
      </div>

      {/* 햄버거 메뉴 */}
      <div className="menuDefaultArea">
        <img
          src={!isOpen ? MenuIcon : CloseIcon}
          alt={!isOpen ? "메뉴 열기" : "메뉴 닫기"}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* 메뉴 영역 */}
      {isOpen ? (
        <div className="openArea">
          <div className="inner">
            {user ? (
              <>
                <p>안녕하세요, {user.displayName}님!</p>
                <p>이메일: {user.email}</p>
                <LogoutButton />
              </>
            ) : (
              <p>로그인 해주세요</p>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
