import "./App.css";
import TypingGame from "./TypingGame";
import { ChakraProvider } from "@chakra-ui/react";
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
