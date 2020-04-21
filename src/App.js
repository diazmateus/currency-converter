import React, {useState} from 'react';
import {ReactQueryDevtools} from "react-query-devtools"
import {useQuery} from "react-query"

export default function App() {
    return (
        <div>
            <Exchange/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </div>
    );
}


const fetchExchange = async currency => {
    const response = await fetch(`https://api.ratesapi.io/api/latest?base=${currency}`)
    return await response.json();
}

function Exchange() {
    const [currency, setCurrency] = useState("BRL")
    const {status, data, error} = useQuery(currency, fetchExchange, {refetchAllOnWindowFocus: false})

    if (status === "loading") return <div>Loading...</div>
    if (status === "error") return <div>Error!</div>

    return <div style={{padding: 16}}>
        <button onClick={() => setCurrency("BRL")}>BRL</button>
        <button onClick={() => setCurrency("USD")}>USD</button>
        <button onClick={() => setCurrency("EUR")}>EUR</button>

        <h2>DATA</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
}
