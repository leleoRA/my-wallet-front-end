import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import Logo from "../styles/Logo"
import styled from "styled-components"
import { useHistory } from "react-router"
import UserContext from "../context/UserContext"

export default function Login () {

    const {setUser} = useContext(UserContext);
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [boolean, setBoolean] = useState(false)
    const history = useHistory()

    const UserStorage = localStorage.getItem("user");

    useEffect(() => {
        if (UserStorage) {
            setUser(JSON.parse(UserStorage))
            history.push("/home")
        }
    }, [])

    return (
        <Container>
            <Logo />
            <Input  placeholder="E-mail"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)} 
                    disabled={boolean}/>
            <Input  placeholder="Senha"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)} 
                    disabled={boolean}/>
            <Button text="Entrar" onClick={() => sendRequest (email, setEmail, password, setPassword, setUser, setBoolean, history)} />
            <p onClick={() => history.push("/sign-up")}>Primeira vez? Cadastre-se!</p>
        </Container>
    )
}

function sendRequest (email,setEmail, password, setPassword, setUser, setBoolean, history) {
    setBoolean(true)
    const body = {email, password}

    const promise = axios.post('http://localhost:4000/login', body)
    promise.then(response => { //response.data = {username, token}
        setBoolean(false)
        setUser(response.data)
        history.push('/home')
        localStorage.setItem("user", JSON.stringify(response.data))
    })
    promise.catch(error => {
        if(error.message === "Request failed with status code 401")
        alert("Falha no login. Tente novamente.")
        setBoolean(false)
        setEmail('')
        setPassword('')})
}

const Container = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        font-weight: 700;
        font-size: 15px;
        color: #fff;
        margin-top: 36px;
        cursor: pointer
    }`