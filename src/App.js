import "./App.css";
import TypingGame from "./TypingGame";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
    return (
        <ChakraProvider>
            <div className="App">
                <TypingGame />
            </div>
        </ChakraProvider>
    );
}

export default App;
