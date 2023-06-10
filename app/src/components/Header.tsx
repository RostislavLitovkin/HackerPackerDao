import { Connect } from "./Connect"
import "./Header.css"
import logo from '../assets/hackpacker.jpg'
import { useNavigate } from "react-router-dom"

export function Header() {
    const navigate = useNavigate()

    return (
        <>
            <nav className="navbar">
                <img src={logo} alt="logo"
                    onClick={() => navigate("/")}
                    style={{ borderRadius: "50px", cursor: "pointer" }}></img>
                <h1 style={{ marginLeft: "15px", cursor: "pointer" }} onClick={() => navigate("/")}>HackPackerDao</h1>

                <h1 style={{ marginLeft: "30px", cursor: "pointer" }}
                    className="new-request-button"
                    onClick={() => {navigate("/newoffer")}}>New request</h1>
                <Connect />
            </nav>

            <br />
            <br />
            <br />
            <br />
            <br />

        </>
    )
}