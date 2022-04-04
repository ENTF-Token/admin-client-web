import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";

import styled from "styled-components";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MainPage from "./page/MainPage";
import ApprovePage from "./page/ApprovePage";
import MemoPage from "./page/MemoPage";
import ProfitPage from "./page/ProfitPage";
import MyPage from "./page/MyPage";
import LoginPage from "./page/LoginPage";
import MembersPage from "./page/MembersPage";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div className="App">

{/********** Header-bar **********/}

      <BrowserRouter>
      
        <Layout>
        
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
              <Menu.Item key="1"> <Link to="/home"> MAIN </Link> </Menu.Item>
              <Menu.Item key="2"> <Link to="/members"> MEMBERS </Link></Menu.Item>
              <Menu.Item key="3"> <Link to="/approve"> APPROVE </Link></Menu.Item>
              <Menu.Item key="4"> <Link to="/profit"> PROFIT </Link> </Menu.Item>
              <Menu.Item key="5"> <Link to="/memo"> MEMO </Link></Menu.Item>
              <Menu.Item key="6"> <Link to="/info"> MY INFO </Link></Menu.Item>
              
            </Menu>
          </Header>
          <Contents className="site-layout">
            <div className="site-layout-background">
              <Routes>
                <Route path="/" element={<LoginPage/>}></Route>  
                <Route path="/home" element={<MainPage />}></Route>
                <Route path="/members" element={<MembersPage />}></Route>
                <Route path="/approve" element={<ApprovePage />}></Route>
                <Route path="/profit" element={<ProfitPage />}></Route>
                <Route path="/memo" element={<MemoPage />}></Route>
                <Route path="/info" element={<MyPage />}></Route>
              </Routes>
            </div>
          </Contents>
        </Layout>
      </BrowserRouter>
{/********** Header-bar **********/}
    </div>
  );
}
const Contents = styled(Content)`
  .site-layout-background {
    background: #fff;
    height: 100vh;
    padding: 24px;
    min-height: 380px;
  }
  .site-layout {
    padding: 0 50px;
    margin-top: 64px;
  }
`;
export default App;
