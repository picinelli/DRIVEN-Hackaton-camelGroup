import styled from 'styled-components'

export default function ContainerCriacao(props) {
  const {disabled, novaSala, setNovaSala, setDisabled} = props
  if(disabled === false) {
    return (
      <ContainerCriacaoSala>
        <Form>
          <Input
            className="valid"
            placeholder="Nome da sala"
            type="text"
            value={novaSala}
            onChange={(e) => {
              setNovaSala(e.target.value);
            }}
            required
          />
        </Form>
        <WrapperBotoes>
          <button onClick={() => setDisabled(true)}>Cancelar</button>
          <button onClick={() => {criarSala()}}>Criar Sala!</button>
        </WrapperBotoes>
      </ContainerCriacaoSala>
    )
  }
  return <></>

  async function criarSala() {
    const config = JSON.parse(localStorage.getItem("config"));

    try {
      await axios.post('https://hackathoncamelgrup.herokuapp.com/', novaSala, config)
    } catch(e) {
      console.log(e)
    }
  }
}

const ContainerCriacaoSala = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 30px 30px 30px;
  width: 100%;
  max-width: 400px;
  height: 200px;
  background-color: lightgray;
  border-radius: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const WrapperBotoes = styled.div`
  button {
    width: 100px;
    margin: 50px 10px 0 10px;
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.textarea`
  border-radius: 8px;
  border: 0;
  width: 310px;
  height: 90px;
  padding-left: 10px;
  font-size: 16px;
  ::placeholder {
    text-align: center;
    font-size: 16px;
    color: #666666;
    padding-left: 4px;
    /* position: absolute;
  left: 10px;
  top: 30%; */
  }
`;