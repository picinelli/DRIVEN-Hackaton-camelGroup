import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import axios from "axios";

export default function Sala() {
	const [dados, setDados] = useState({ perguntas: [] });
	const { query } = useRouter();
	useEffect(() => {
		const promise = axios.post("https://hackathoncamelgrup.herokuapp.com/", {
			id: query.id,
		});
		promise.then((response) => {
			setDados({ ...response.data });
		});
	}, []);
	console.log(dados);
	return (
		<>
			<Header>{dados.nome_sala}</Header>
			<Main>
				{dados.perguntas.map((element) => {
					return <Card>{element}</Card>;
				})}
			</Main>
		</>
	);
}
const Header = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 28px;
	font-weight: 600;
	font-family: "Roboto Flex";
	color: white;
	height: 90px;
	width: 100vw;
	background-color: black;
`;
const Main = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
`;
const Card = styled.div`
	background-color: #00fcfc;
	width: 80%;
	height: 350px;
	margin-top: 50px;
`;
