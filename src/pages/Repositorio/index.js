import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../../services/api'
import { Container } from "./styles";

export default function Repositorio(){
    const { repositorio } = useParams()

    const [repositorioInfo, setRepositorioInfo] = useState({});
    const [issues , setIssues] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(repositorio)
        async function load(){
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`repos/${repositorio}`),
                api.get(`repos/${repositorio}/issues`, {
                    params:{
                        state: 'open',
                        per_page: 5,
                    }
                })
            ]);

            setRepositorioInfo(repositorioData.data)
            setIssues(issuesData.data)
            setLoading(false)
        };

        load();

    }, [])
    
    return(
        <Container>
       
        </Container>
    )
}