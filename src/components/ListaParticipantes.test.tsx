import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import { ListaParticipantes } from "./ListaParticipantes";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";

jest.mock("../state/hooks/useListaDeParticipantes")

describe("uma lista vazia de participante", () => {
   beforeEach(() => {
      (useListaDeParticipantes as jest.Mock).mockReturnValue([])
   })

	test("deve ser renderizada sem elementos", () => {
		render(
			<RecoilRoot>
				<ListaParticipantes />
			</RecoilRoot>
		);

		const itens = screen.queryAllByRole("listitem");

		expect(itens).toHaveLength(0);
	});
});

describe("uma lista preenchida de participante", () => {
   const participantes = ['Pedro', 'Ana']

   beforeEach(() => {
      (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
   })

	test("deve ser renderizada com seus elementos", () => {
		render(
			<RecoilRoot>
				<ListaParticipantes />
			</RecoilRoot>
		);

		const itens = screen.queryAllByRole("listitem");

		expect(itens).toHaveLength(participantes.length);
	});
});