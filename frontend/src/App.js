import "./App.css";
import MainviewContextProvider from "./components/context/MainviewContext";
import MainpageComponent from "./components/MainpageComponent";

function App() {
    return (
        <MainviewContextProvider>
            <MainpageComponent />
        </MainviewContextProvider>
    );
}

export default App;
