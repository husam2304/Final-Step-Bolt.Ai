import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Layouts/Header'
import ChatButton from '../components/UI/Buttons/ChatButton'
import Footer from '../components/Layouts/Footer'

export const MainLayout = () => {

    return (
        <>
            <Header />
            <div className="container">
                <Outlet />
            </div>
            <ChatButton />
            <Footer />

        </>
    )
}

export default MainLayout
