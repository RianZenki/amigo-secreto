import { Card } from "../Card/Card";
import { Formulario } from "../Formulario";
import { ListaParticipantes } from "../ListaParticipantes";
import { Rodape } from "../Rodape";

import classes from './Configuracao.module.css'

export const Configuracao = () => {
	return (
		<Card>
			<section className={classes.configuracao}>
				<h2>Vamos começar!</h2>
				<Formulario />
				<ListaParticipantes />
				<Rodape />
			</section>
		</Card>
	);
};
