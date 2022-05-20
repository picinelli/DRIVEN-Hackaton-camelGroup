import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from "axios";

export default function Login() {

    const URL_BACK = "https://hackathoncamelgrup.herokuapp.com";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState(<p></p>); //Usuário e/ou senha incorretos;

    const router = useRouter();

    function loginForm(event) {
        event.preventDefault();

        const promisse = axios.post(URL_BACK + "/login", {
            email: email,
            password: password
        })

        promisse.then(res => {
            localStorage.setItem("token", res.data);
            router.push('/');
        });

        promisse.catch(error => {
            if (error.response.status === 401) {
                setErro(<p>Usuário e/ou senha incorretos</p>);
            } else {
                alert("Infelizmente, não foi possível realizar o cadastro. Tente novamente mais tarde.");
            }
            console.log(error);
        });

    }

    useEffect(() => {

        /* const token = window.localStorage.getItem("token");
        
        const promiseToken = axios.get(URL_BACK + "/login", {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        promiseToken.then(res => {
            router.push('/');
        });

        promiseToken.catch(error => {
            console.log(error);
        }); */
       
    }, []);

    return (
        <LoginStyle>
            <h1>RespondeAqui</h1>
            <form onSubmit={loginForm}>
                <input type="email" value={email} placeholder="E-mail" onChange={e => setEmail(e.target.value)} required />
                <input type="password" value={password} placeholder="Senha" onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Entrar</button>
            </form>
            {erro}
            <Link href="/signup">Primeira vez? Cadastre-se!</Link>
        </LoginStyle>
    )
}

const LoginStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #202020;

    font-family: 'Roboto', sans-serif;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-family: 'Dosis', sans-serif;
        font-size: 32px;
        color: white;
        margin-bottom: 24px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    form > input {
        height: 58px;
        width: 326px;
        border-radius: 5px;
        border: 0;  
        padding: 15px;
        box-sizing: border-box;
        margin-bottom: 13px;
        font-size: 20px;
    }

    form > button {
        height: 46px;
        width: 326px;
        border-radius: 5px;
        border: 0;
        font-size: 20px;
        font-weight: 700;
        background-color: black;
        color: white;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    p {
        margin-top: 4px;
        height: 16px;
        font-size: 15px;
        font-weight: 700;
        color: red;
    }

    a {
        font-size: 15px;
        font-weight: 700;
        color: white;
        text-decoration: none;
        margin-top: 16px;
    }
`;