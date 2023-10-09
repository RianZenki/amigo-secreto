import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes";
import { Sorteio } from "./Sorteio";
import { useResultadoSorteio } from "../../state/hooks/useResultadoSorteio";

jest.mock("../../state/hooks/useListaDeParticipantes");
jest.mock("../../state/hooks/useResultadoSorteio");

describe("na pagina de sorteio", () => {
	const participantes = ["Pedro", "Vitor", "Ana", "Julia"];
	const resultado = new Map([
		["Pedro", "Julia"],
		["Vitor", "Ana"],
		["Ana", "Pedro"],
		["Julia", "Vitor"],
	]);

	beforeEach(() => {
		(useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
		(useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
	});

	test("todos os participantes podem exibir o seu amigo secreto", () => {
		render(
			<RecoilRoot>
				<Sorteio />
			</RecoilRoot>
		);

		const opcoes = screen.queryAllByRole("option");

		expect(opcoes).toHaveLength(participantes.length + 1);
	});

	test("o amigo secreto é exibido quando solicitado", () => {
		render(
			<RecoilRoot>
				<Sorteio />
			</RecoilRoot>
		);

		const select = screen.getByPlaceholderText(/Selecione seu nome/i);
		fireEvent.change(select, {
			target: {
				value: participantes[0],
			},
		});

		const botao = screen.getByRole("button");
		fireEvent.click(botao);

		const amigoSecreto = screen.getByRole("alert");

		expect(amigoSecreto).toBeInTheDocument();
	});
});
