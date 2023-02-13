import { ChakraProvider } from "@chakra-ui/react";
import TypingGame from "./components/TypingGame";
import "./App.css";
import { theme } from "./theme";
function App() {
    return (
        <ChakraProvider theme={theme}>
            <div className="App">
                <TypingGame />
            </div>
        </ChakraProvider>
    );
}

export default App;
