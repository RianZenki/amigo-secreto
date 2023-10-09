import shuffle from "just-shuffle";

export const realizarSorteio = (participantes: string[]) => {
	const totalDeParticipantes = participantes.length;

	const resultado = new Map<string, string>();

	const embaralhado = shuffle(participantes);

	for (let i = 0; i < totalDeParticipantes; i++) {
		const indexDoAmigo = i === totalDeParticipantes - 1 ? 0 : i + 1;
		resultado.set(embaralhado[i], embaralhado[indexDoAmigo]);
	}

	return resultado;
};
