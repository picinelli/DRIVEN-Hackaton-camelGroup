import {useEffect, useState} from 'react'
import Link from 'next/link'
import axios from 'axios'

import styled from "styled-components";
import plus from '../assets/plus.jpg'
import Image from 'next/image'


export default function HomeComponent() {
  const [salas, setSalas] = useState(false)
  useEffect(() => {
    async function buscarSalas() {
      try {
        setSalas(await axios.get("https://hackathoncamelgrup.herokuapp.com/"))
      } catch(e) {
        console.log(e)
      }
    }
    buscarSalas(), console.log(salas.data)
  }
  , [])

  return (
  <Container>
    <Header>
      <h1>Bem vindo, Fulano!!</h1>
    </Header>
    <ContainerSalasRegistradas>
      <h2>Salas Registradas</h2>
      <WrapperTodasSalas>
        <WrapperSalaRegistrada>
          <Sala>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/640px-SpongeBob_SquarePants_character.svg.png"></img>
          </Sala>
          <p>Matemática</p>
        </WrapperSalaRegistrada>
        <WrapperSalaRegistrada>
          <Sala></Sala>
          <p>Matemática</p>
        </WrapperSalaRegistrada>
        <WrapperSalaRegistrada>
          <Sala></Sala>
          <p>Matemática</p>
        </WrapperSalaRegistrada>
        <WrapperSalaRegistrada>
          <Sala></Sala>
          <p>Matemática</p>
        </WrapperSalaRegistrada>
        <WrapperSalaRegistrada>
          <Sala></Sala>
          <p>Matemática</p>
        </WrapperSalaRegistrada>
        <WrapperSalaRegistrada>
          <Sala></Sala>
          <p>Matemática</p>
        </WrapperSalaRegistrada>
        <WrapperSalaRegistrada>
          <Sala></Sala>
          <p>Matemática</p>
        </WrapperSalaRegistrada>
      </WrapperTodasSalas>
    </ContainerSalasRegistradas>
    <ContainerSalasGerais>
      <HeaderSalasGerais>
        <h2>Salas Globais</h2>
        <Image src={plus} width={70} height={70} />
      </HeaderSalasGerais>
      <CarregarSalasGerais />

    </ContainerSalasGerais>
  </Container>
  )

  function CarregarSalasGerais() {
      if(!salas) return <></>
      return (
        salas.data.map((e) => {
          const {nome_sala, sala, usuario_criador, _id} = e
          return (
            <Link key={sala} href={`/sala/${sala}`}>
              <WrapperSalaGeral onClick={(e) => {entrarNaSala(e, sala)}}>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/640px-SpongeBob_SquarePants_character.svg.png"></img>
                <WrapperNome>
                  <h3>{nome_sala}</h3>
                  <p>{usuario_criador}</p>
                </WrapperNome>
              </WrapperSalaGeral>
            </Link>
          )
      })
    )
  }

  function entrarNaSala(e, sala) {
    console.log(sala)
  }
}

const Header = styled.div`
  padding: 0 10px 0 10px;
  margin-bottom: 40px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  width: 100%;
  height: 50px;
`;
const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
`;
const ContainerSalasRegistradas = styled.div`
  padding: 0 10px 0 10px;
  margin-bottom: 40px;
  width: 100%;
  color: #FFFFFF;
  height: 170px;

  @media (min-width: 768px) {
    max-width: 700px;
    margin: auto;
    margin-bottom: 40px;
  }
`;
const WrapperTodasSalas = styled.div`
  display: flex;
  overflow-x: scroll;
`
const WrapperSalaRegistrada = styled.div`
  padding: 0 18px 0 0;
  display: flex;
  max-width: 131px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Sala = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: contain;
    width: 65px;
  }
`
const ContainerSalasGerais = styled.div`
  background-color: #FFFFFF;
  border-radius: 50px 50px 0 0;
  padding: 10px 15px 20px 15px;
  height: 100%;
  width: 100vw;
`
const HeaderSalasGerais = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
`

const WrapperSalaGeral = styled.div`
  width: 100%;
  height: 80px;
  background-color: #EAEAEA;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 5px;

  img {
    object-fit: contain;
    width: 55px;
    margin-right: 10px;
  }
`
const WrapperNome = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    margin: 0;
    padding-bottom: 7px;
  }
  p {
    color: gray;
    margin: 0;
    padding: 0;
  }
`
