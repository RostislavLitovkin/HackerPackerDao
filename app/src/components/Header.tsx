import { Connect } from "./Connect"
import "./Header.css"
import logo from '../assets/hackpacker.jpg'

export function Header() {


    return (
        <>
            <nav className="navbar">
                <img src={logo} alt="logo"
                    style={{ borderRadius: "50px", }}></img>
                <h1 style={{ marginLeft: "15px" }}>HackPackerDao</h1>
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