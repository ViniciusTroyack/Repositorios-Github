
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";

import Main from './pages/Main';
import Repositorio from './pages/Repositorio'

export default function Routes(){
    return(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' element={<Main/>}/>
            <Route path='/repositorio/:repositorio' element={<Repositorio />} />
        </Switch>
    </BrowserRouter>
    );
}

