import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/actions/userAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "./Header.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#716F6F",
      darker: "#F4F2EF",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    // dispatch 함수를 이용해 로그아웃함.
    dispatch(logoutUser());
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <>
      <div className="header">
        <ThemeProvider theme={theme}>
          <ul className="header-navigate">
            <li onClick={() => navigate("/")}>
              <Button variant="text" color="primary">
                Home
              </Button>
            </li>
            <li onClick={() => navigate("/boardgame")}>
              <Button>Boardgame</Button>
            </li>
            <li>
              <Button>Mypage</Button>
            </li>
            <li onClick={logout} style={{ cursor: "pointer" }}>
              <Button>Logout</Button>
            </li>
          </ul>
        </ThemeProvider>
      </div>
    </>
  );
}

export default Header;
