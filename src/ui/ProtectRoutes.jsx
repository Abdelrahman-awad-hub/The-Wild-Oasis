import styled from "styled-components"
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`

function ProtectRoutes({ children }) {
    const navigate = useNavigate()

    // 1- Load the authenticated user
    const { isLoading, isAuth } = useUser()

    // 2- if there is no authenticated user, redirect to the /login page
    useEffect(function () {
        if (!isAuth && !isLoading)
            navigate('/login')
    }, [isLoading, isAuth, navigate])

    // 3- while loading, show sppiner
    if (isLoading) return <FullPage><Spinner /></FullPage>


    // 4- if there is a user render the app
    if (isAuth) return children
}

export default ProtectRoutes