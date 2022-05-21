import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import axios from "axios";

export default function Sala() {
	const [input, setInput] = useState("");
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
	console.log(dados.perguntas);
	return (
		<>
			<Header>{dados.nome_sala}</Header>
			<Main>
				{dados.perguntas.map((element, i) => {
					return (
						<Card key={i}>
							<div className='titulo'>{element.titulo}</div>
							<div
								className={`resposta ${
									element.respostas.respondido ? "" : "hidden"
								}`}>
								{element.respostas.mensagem}
							</div>
							{element.respostas.respondido ? (
								<></>
							) : (
								<form
									onSubmit={(e) => {
										e.preventDefault();
									}}>
									<input type='text' />
									<button>Enviar Resposta</button>
								</form>
							)}
						</Card>
					);
				})}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const promise = axios.post("https://hackathoncamelgrup.herokuapp.com/post", {
							id: query.id,
							titulo: input,
						})
					}}>
					<input
						type='text'
						onChange={(e) => {
							setInput(e.target.value);
						}}
					/>
					<button>Fazer Pergunta</button>
				</form>
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
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 70%;
	height: 250px;
	margin-top: 50px;
	border-radius: 25px;
	box-shadow: 10px 10px 12px 1px rgba(0, 0, 0, 0.75);
	.titulo {
		margin-top: 20px;
		font-size: 24px;
		font-weight: 600;
		font-family: "Roboto Flex";
	}
	.resposta {
		margin-top: 70px;
		font-size: 24px;
		font-weight: 400;
		font-family: "Roboto Flex";
	}
	form {
		display: flex;
		flex-direction: column;
		margin-top: 30px;
	}
	input {
		height: 50px;
		margin-bottom: 15px;
		font-size: 24px;
		font-weight: 400;
		font-family: "Roboto Flex";
	}
	button {
		height: 30px;
	}
	.hidden {
		display: none;
	}
`;
