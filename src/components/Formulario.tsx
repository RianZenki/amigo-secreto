import { FormEvent, useState, useRef } from "react";
import { useAdicionarParticipante } from "../state/hooks/useAdicionarParticipante";
import { useMensagemDeErro } from "../state/hooks/useMensagemDeErro";

import classes from "./Formulario.module.css";

export const Formulario = () => {
	const [nome, setNome] = useState("");

	const inputRef = useRef<HTMLInputElement>(null);

	const adicionarNaLista = useAdicionarParticipante();
	const mensagemDeErro = useMensagemDeErro();

	const handleAdicionarParticipante = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		adicionarNaLista(nome);
		setNome("");
		inputRef.current?.focus();
	};

	return (
		<form onSubmit={handleAdicionarParticipante}>
			<div className={classes["grupo-input-btn"]}>
				<input
					value={nome}
					onChange={(event) => setNome(event.target.value)}
					type="text"
					placeholder="Insira os nomes dos participantes"
					ref={inputRef}
				/>
				<button disabled={!nome}>Adicionar</button>
			</div>
			{mensagemDeErro && <p role="alert" className={`${classes.alerta} ${classes.erro}`}>{mensagemDeErro}</p>}
		</form>
	);
};
