import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SingleItem from '../pages/SingleItem/SingleItem';
import '../styles/main.css';
import ChatRoom from '../pages/ChatRoom/ChatRoom';
import SearchResult from '../pages/SearchResult/SearchResult';
import UserAccount from '../pages/UserAccount/UserAccount';
import NewItem from '../pages/NewItem/NewItem';

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/single-item" element={<SingleItem />} />
        <Route path="/chat-room" element={<ChatRoom />} />
        <Route path="/new-item" element={<NewItem />} />
        <Route path="/user-account" element={<UserAccount />} />
      </Routes>
    </BrowserRouter>
  );
}
