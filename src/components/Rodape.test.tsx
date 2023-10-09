import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil"

import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import { Rodape } from "./Rodape";

jest.mock("../state/hooks/useListaDeParticipantes")

const mockNavegacao = jest.fn()
const mockSorteador = jest.fn()

jest.mock('react-router-dom', () => {
   return {
      useNavigate: () => mockNavegacao
   }
})

jest.mock('../state/hooks/useSorteador', () => {
   return {
      useSorteador: () => mockSorteador
   }
})

describe("quando não existem participantes suficientes", () => {
   beforeEach(() => {
      (useListaDeParticipantes as jest.Mock).mockReturnValue([])
   })

   test("a brincadeira não pode ser iniciada", () => {
      render(<RecoilRoot>
         <Rodape />
      </RecoilRoot>)

      const botao = screen.getByText(/iniciar brincadeira!/i);

      expect(botao).toBeDisabled()
   })
})

describe("quando existem participantes suficientes", () => {
   beforeEach(() => {
      (useListaDeParticipantes as jest.Mock).mockReturnValue(['João', 'Maria', 'Antonio', 'Mario'])
   })

   test("a brincadeira pode ser iniciada", () => {
      render(<RecoilRoot>
         <Rodape />
      </RecoilRoot>)

      const botao = screen.getByText(/iniciar brincadeira!/i);

      expect(botao).not.toBeDisabled()
   })

   test("a brincadeira foi iniciada", () => {
      render(<RecoilRoot>
         <Rodape />
      </RecoilRoot>)

      const botao = screen.getByText(/iniciar brincadeira!/i);
      fireEvent.click(botao)

      expect(mockNavegacao).toBeCalledTimes(1)
      expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
      expect(mockSorteador).toHaveBeenCalledTimes(1)
   })
})