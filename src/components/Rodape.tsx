import { useNavigate } from "react-router-dom";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";

import classes from "./Rodape.module.css";
import { useSorteador } from "../state/hooks/useSorteador";

export const Rodape = () => {
	const participantes = useListaDeParticipantes();
	const navegacao = useNavigate();
	const sortear = useSorteador()

	const iniciar = () => {
		navegacao("/sorteio");
		sortear()
	};

	return (
		<footer className={classes["rodape-configuracoes"]}>
			<button className={classes.botao} disabled={participantes.length < 3} onClick={iniciar}>
				Iniciar brincadeira!
			</button>
			<img src="/images/sacolas.png" alt="Sacolas de compras" />
		</footer>
	);
};
