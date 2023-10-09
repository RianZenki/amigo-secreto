import { useState } from "react";
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes";
import { useResultadoSorteio } from "../../state/hooks/useResultadoSorteio";

import classes from "./Sorteio.module.css";
import { Card } from "../Card/Card";

export const Sorteio = () => {
	const [participanteDaVez, setParticipanteDaVez] = useState("");
	const [amigoSecreto, setAmigoSecreto] = useState("");
	const participantes = useListaDeParticipantes();

	const resultado = useResultadoSorteio();

	const sortear = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (resultado.has(participanteDaVez)) {
			setAmigoSecreto(resultado.get(participanteDaVez)!);
		}
	};

	return (
		<Card>
			<section className={classes.sorteio}>
				<h2>Quem vai tirar o papelzinho?</h2>
				<form onSubmit={sortear}>
					<select
						required
						name="participanteDaVez"
						id="participanteDaVez"
						placeholder="Selecione seu nome"
						value={participanteDaVez}
						onChange={(e) => setParticipanteDaVez(e.target.value)}
					>
						<option>Selecione o nome do participante...</option>
						{participantes.map((participante) => (
							<option key={participante}>{participante}</option>
						))}
					</select>
					<p>Clique em em sortear para ver quem é seu amigo secreto!</p>
					<button className={classes["botao-sortear"]}>Sortear!</button>
				</form>
				{amigoSecreto && (
					<p role="alert" className={classes["amigo-secreto"]}>
						{amigoSecreto}
					</p>
				)}
				<footer className={classes.sorteio}>
					<img
						src="/images/aviao.png"
						alt="Avião"
						className={classes.aviao}
					/>
				</footer>
			</section>
		</Card>
	);
};
