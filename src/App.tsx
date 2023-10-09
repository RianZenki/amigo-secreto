import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { Configuracao } from "./components/pages/Configuracao";
import { Sorteio } from "./components/pages/Sorteio";

function App() {
	return (
		<BrowserRouter>
			<RecoilRoot>
				<Routes>
					<Route path="/" element={<Configuracao />} />
					<Route path="/sorteio" element={<Sorteio />} />
				</Routes>
			</RecoilRoot>
		</BrowserRouter>
	);
}

export default App;
