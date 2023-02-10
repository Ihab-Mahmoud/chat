import React from 'react'
import { Navbar } from '../components/navbar'
import { Search } from '../components/search'
import { Chats } from '../components/chats'

export const Sidebar = () =>
{
    return (
        <div className="sidebar">
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}
