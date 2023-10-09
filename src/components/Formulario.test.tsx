import { act, fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import { Formulario } from "./Formulario";

describe("o comportamento do Forumario.tsx", () => {
	test("quando o input está vazio, novos participantes não podem ser adicionados", () => {
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>
		);

		const input = screen.getByPlaceholderText(
			/Insira os nomes dos participantes/i
		);
		const botao = screen.getByRole("button");

		expect(input).toBeInTheDocument();
		expect(botao).toBeDisabled();
	});

	test("adicionar um participante caso exista um nome preenchido", () => {
		// É necessário encapsular o component com um RecoilRoot, para os metodos do recoil funcionar
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>
		);

		const input = screen.getByPlaceholderText(
			/insira os nomes dos participantes/i
		);
		const botao = screen.getByRole("button");

		// Insere um valor no input
		fireEvent.change(input, {
			target: {
				value: "Pedro",
			},
		});

		// Aciona o click no botão
		fireEvent.click(botao);

		// Veririfica se o input está focado
		expect(input).toHaveFocus();
		// Verifica se o input não possui valor
		expect(input).toHaveValue("");
		// verifica se o botão está desibilitado
		expect(botao).toBeDisabled();
	});

	test("nomes duplicados não podem ser adicionados na lista", () => {
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>
		);

		const input = screen.getByPlaceholderText(
			/insira os nomes dos participantes/i
		);
		const botao = screen.getByRole("button");

		fireEvent.change(input, {
			target: {
				value: "Pedro",
			},
		});

		fireEvent.click(botao);

		// adicionando um nome duplicado
		fireEvent.change(input, {
			target: {
				value: "Pedro",
			},
		});

		fireEvent.click(botao);

		const mensagemDeErro = screen.getByRole("alert");

		expect(mensagemDeErro.textContent).toBe(
			"Nomes duplicados não são permitidos!"
		);
	});

	test("a mensagem de erro deve sumir apos os timers", () => {
		// Metodo que simula um timer
		jest.useFakeTimers();

		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>
		);

		const input = screen.getByPlaceholderText(
			/insira os nomes dos participantes/i
		);
		const botao = screen.getByRole("button");

		fireEvent.change(input, {
			target: {
				value: "Pedro",
			},
		});
		fireEvent.click(botao);

		fireEvent.change(input, {
			target: {
				value: "Pedro",
			},
		});
		fireEvent.click(botao);

		let mensagemDeErro = screen.queryByRole("alert");
		expect(mensagemDeErro).toBeInTheDocument();

		// Método para quando acontece uma atualização de estados
		act(() => {
			//Esperar n segundos
			jest.runAllTimers();
		});

		mensagemDeErro = screen.queryByRole("alert");
		expect(mensagemDeErro).toBeNull();
	});
});
