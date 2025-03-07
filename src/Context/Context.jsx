import { createContext, useState } from "react";
import run from '/src/config/gemini';
export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    const onSent = async (prompt) => {

        setResultData(""); // Clear previous result
        setLoading(true); // Set loading to true before API call
        setShowResult(true);

        try{
            const response = await run(input); // Pass 'prompt' to the API
            setResultData(response); // Store response for display
        } catch (error) {
            console.error("Error in onSent:", error);
            setResultData("Failed to fetch response.");
        } finally {
            setLoading(false);
            setInput(""); // Clear input field after API call
        } 
    };


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider