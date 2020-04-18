import React  from 'react';
import {StatusBar}  from 'react-native';

/**Import do Reactotron */
import '../src/config/ReactotronConfig'

/**Import das rotas do app */
import Routes from "./routes";

export default function App(){
    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#7159c1"
            ></StatusBar>
            <Routes></Routes>
        </>
    )
}
