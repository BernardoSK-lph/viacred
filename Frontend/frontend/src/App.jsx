import { useState } from "react";
import "./index.css";
import logo from "./assets/logo.png";
import desenho from "./assets/desenho.png";
import estrelaVazia from "./assets/starlight.png";
import estrelaPreenchida from "./assets/estrela_active.png";
import { salvarPesquisa } from "./services/api";

export default function App() {
  // --- Estados (States) ---
  const [etapa, setEtapa] = useState(0);
  const [escalaSelecionada, setEscalaSelecionada] = useState(null);
  const [mensagem, setMensagem] = useState(null);
  const [contador, setContador] = useState(1);
  const [cpf, setCpf] = useState([null, null, null, null, null, null, null, null, null, null, null]);
  const [estrelaSelecionada, setEstrelaSelecionada] = useState({
    ambiente: 0,
    atendimento: 0,
    espera: 0,
  });

  // --- Funções de Lógica ---
  const adicionarNumero = (numeroDigitado) => {
    if (contador > 11) {
      return;
    }

    const novoCpf = [...cpf];
    novoCpf[contador - 1] = numeroDigitado;
    setCpf(novoCpf);

    let proximoContador = contador + 1;
    setContador(proximoContador);
  };

  const apagarNumero = () => {
    let proximoContador = contador - 1;
    if (proximoContador === 0) {
      proximoContador = 1;
    }

    const novoCpf = [...cpf];
    novoCpf[proximoContador - 1] = null;

    setCpf(novoCpf);
    setContador(proximoContador);
  };

  const finalizarPesquisa = async () => {
    const cpfString = cpf[0] !== null ? cpf.join("") : null;

    const dadosParaEnviar = {
      nei: escalaSelecionada,
      avaliacao_ambiente: estrelaSelecionada.ambiente,
      avaliacao_atendimento: estrelaSelecionada.atendimento,
      avaliacao_espera: estrelaSelecionada.espera,
      cpf: cpfString,
      comentario: mensagem,
    };

    try {
      await salvarPesquisa(dadosParaEnviar);
      setEtapa(5);
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
      alert("Não foi possível salvar sua avaliação. Por favor, tente novamente.");
    }
  };

  // --- Renderização (JSX) ---
  return (
    <div className="pagina-geral">
      <img src={desenho} className="desenho" alt="Desenho" />

      {/* ETAPA 0 - Escala NPS */}
      {etapa === 0 && (
        <div className="janelaEtapa1">
          <img src={logo} className="logo" alt="Logo" />
          <p className="textoEtapa1">
            Em uma escala de 0 a 10 o quanto você indicaria a experiência de hoje para amigos e familiares?
          </p>

          <div className="escalaEtapa1">
            <button style={{ backgroundColor: "#5b1f16" }} className={escalaSelecionada === 0 ? "botao-escala destaque" : "botao-escala"} onClick={() => setEscalaSelecionada(0)}>0</button>
            <button style={{ backgroundColor: "#942a18" }} className={escalaSelecionada === 1 ? "botao-escala destaque" : "botao-escala"} onClick={() => setEscalaSelecionada(1)}>1</button>
            <button style={{ backgroundColor: "#e73c22" }} className={escalaSelecionada === 2 ? "botao-escala destaque" : "botao-escala"} onClick={() => setEscalaSelecionada(2)}>2</button>
            <button style={{ backgroundColor: "#ec681c" }} className={escalaSelecionada === 3 ? "botao-escala destaque" : "botao-escala"} onClick={() => setEscalaSelecionada(3)}>3</button>
            <button style={{ backgroundColor: "#f39019" }} className={escalaSelecionada === 4 ? "botao-escala destaque" : "botao-escala"} onClick={() => setEscalaSelecionada(4)}>4</button>
            <button style={{ backgroundColor: "#fbba18" }} className={escalaSelecionada === 5 ? "botao-escala destaque" : "botao-escala"} onClick={() => setEscalaSelecionada(5)}>5</button>
            <button style={{ backgroundColor: "#fcda23" }} className={escalaSelecionada === 6 ? "botao-escala destaque" : "botao-escala"} onClick={() => setEscalaSelecionada(6)}>6</button>
            <button style={{ backgroundColor: "#cccc5f" }} className={escalaSelecionada === 7 ? "botao-escala destaque" : "botao-escala"} onClick={() => setEscalaSelecionada(7)}>7</button>
            <button style={{ backgroundColor: "#cccc5f" }} className={escalaSelecionada === 8 ? "botao-escala destaque" : "botao-escala"} onClick={() => setEscalaSelecionada(8)}>8</button>
            <button style={{ backgroundColor: "#69b436" }} className={escalaSelecionada === 9 ? "botao-escala destaque" : "botao-escala"} onClick={() => setEscalaSelecionada(9)}>9</button>
            <button style={{ backgroundColor: "#316e2e" }} className={escalaSelecionada === 10 ? "botao-escala destaque" : "botao-escala"} onClick={() => setEscalaSelecionada(10)}>10</button>
          </div>
          
          <button id="enviarEtapa1" disabled={escalaSelecionada === null} onClick={() => setEtapa(1)}>Enviar</button>
        </div>
      )}

      {/* ETAPA 1 - Avaliação com Estrelas */}
      {etapa === 1 && (
        <div className="janelaEtapa2">
          <div className="container-avaliacoes">
            {/* Ambiente */}
            <div className="linha-avaliacao">
              <p className="textoEtapa2">Ambiente do Posto de Atendimento</p>
              <div className="estrelas1Etapa2">
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, ambiente: 1 })}><img src={estrelaSelecionada.ambiente >= 1 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, ambiente: 2 })}><img src={estrelaSelecionada.ambiente >= 2 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, ambiente: 3 })}><img src={estrelaSelecionada.ambiente >= 3 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, ambiente: 4 })}><img src={estrelaSelecionada.ambiente >= 4 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, ambiente: 5 })}><img src={estrelaSelecionada.ambiente >= 5 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
              </div>
            </div>

            {/* Atendimento */}
            <div className="linha-avaliacao">
              <p className="textoEtapa2">Atendimento dos colaboradores</p>
              <div className="estrelas2Etapa2">
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, atendimento: 1 })}><img src={estrelaSelecionada.atendimento >= 1 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, atendimento: 2 })}><img src={estrelaSelecionada.atendimento >= 2 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, atendimento: 3 })}><img src={estrelaSelecionada.atendimento >= 3 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, atendimento: 4 })}><img src={estrelaSelecionada.atendimento >= 4 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, atendimento: 5 })}><img src={estrelaSelecionada.atendimento >= 5 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
              </div>
            </div>

            {/* Espera */}
            <div className="linha-avaliacao">
              <p className="textoEtapa2">Tempo de espera</p>
              <div className="estrelas3Etapa2">
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, espera: 1 })}><img src={estrelaSelecionada.espera >= 1 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, espera: 2 })}><img src={estrelaSelecionada.espera >= 2 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, espera: 3 })}><img src={estrelaSelecionada.espera >= 3 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, espera: 4 })}><img src={estrelaSelecionada.espera >= 4 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
                <button className="botao-estrela" onClick={() => setEstrelaSelecionada({ ...estrelaSelecionada, espera: 5 })}><img src={estrelaSelecionada.espera >= 5 ? estrelaPreenchida : estrelaVazia} className="estrela" alt="estrela" /></button>
              </div>
            </div>
          </div>

          <button 
            id="enviarEtapa2" 
            disabled={estrelaSelecionada.ambiente === 0 || estrelaSelecionada.atendimento === 0 || estrelaSelecionada.espera === 0} 
            onClick={() => setEtapa(2)}
          >
            Enviar
          </button>
        </div>
      )}

      {/* ETAPA 2 - Pergunta sobre CPF */}
      {etapa === 2 && (
        <div className="janelaEtapa3">
          <img src={logo} className="logo" alt="Logo" />
          <p className="textoEtapa3">Gostaria de informar o seu CPF?</p>
          <div className="botoesEtapa3">
            <button className="botaoSimEtapa3" onClick={() => setEtapa(3)}>Sim</button>
            <button className="botaoNaoEtapa3" onClick={() => setEtapa(4)}>Não</button>
          </div>
        </div>
      )}

      {/* ETAPA 3 - Teclado numérico para CPF */}
      {etapa === 3 && (
        <div className="janelaEtapa4">
          <img src={logo} className="logo" alt="Logo" />

          <div className="calculadora-simples">
            <div className="visor-simples">
              {cpf.map((digito, index) => (
                <span 
                  key={index} 
                  className={`slot-cpf ${contador === index + 1 ? "slot-ativo" : ""}`}
                >
                  {digito !== null ? digito : "."}
                </span>
              ))}
            </div>

            <div className="linha-divisoria"></div>

            <div className="teclado-simples">
              <div className="linha-botoes">
                <button className="botaoCPF" onClick={() => adicionarNumero(1)}>1</button>
                <button className="botaoCPF" onClick={() => adicionarNumero(2)}>2</button>
                <button className="botaoCPF" onClick={() => adicionarNumero(3)}>3</button>
              </div>

              <div className="linha-botoes">
                <button className="botaoCPF" onClick={() => adicionarNumero(4)}>4</button>
                <button className="botaoCPF" onClick={() => adicionarNumero(5)}>5</button>
                <button className="botaoCPF" onClick={() => adicionarNumero(6)}>6</button>
              </div>

              <div className="linha-botoes">
                <button className="botaoCPF" onClick={() => adicionarNumero(7)}>7</button>
                <button className="botaoCPF" onClick={() => adicionarNumero(8)}>8</button>
                <button className="botaoCPF" onClick={() => adicionarNumero(9)}>9</button>
              </div>

              <div className="linha-botoes">
                <button className="botaoCPF" onClick={() => adicionarNumero(0)}>0</button>
                <button className="botaoCPF botao-excluir" onClick={apagarNumero}>X</button>
              </div>
            </div>
          </div>
          
          <button className="enviarEtapa4" disabled={contador < 12} onClick={() => setEtapa(4)}>Enviar</button>
        </div>
      )}

      {/* ETAPA 4 - Caixa de Comentário */}
      {etapa === 4 && (
        <div className="janelaEtapa5">
          <img src={logo} className="logo" alt="Logo" />
          <p className="textoEtapa5">Deixe seu comentário</p>
          <textarea 
            className="caixaDeTextoEtapa5" 
            placeholder="Digite sua mensagem aqui... (máx. 600 caracteres)" 
            maxLength={600} 
            onChange={(e) => setMensagem(e.target.value)}
          />
          <button className="enviarEtapa5" onClick={finalizarPesquisa}>Enviar comentário</button>
        </div>
      )}

      {/* ETAPA 5 - Sucesso / Agradecimento */}
      {etapa === 5 && (
        <div className="janelaEtapa6">
          <img src={logo} className="logo" alt="Logo" />
          <p className="texto1Etapa6">Obrigado!</p>
          <p className="texto2Etapa6">Seus dados foram salvos com <span className="sucessoLaranja">sucesso!</span></p>
        </div>
      )}
    </div>
  );
}