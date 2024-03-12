import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../../services/api'
import { Container, Owner, Loading, BackButton } from "./styles";
import {FaArrowLeft} from 'react-icons/fa'

export default function Repositorio() {
    const { repositorio } = useParams()

    const [repositorioInfo, setRepositorioInfo] = useState({});
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function load() {
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`repos/${repositorio}`),
                api.get(`repos/${repositorio}/issues`, {
                    params: {
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

    }, [repositorio])
    if(loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )

    }

    return (
        <Container>
            <BackButton to='/'>
                <FaArrowLeft color='#000' size={30}/>
            </BackButton>
            <Owner>
                <img
                    src={repositorioInfo.owner.avatar_url}
                    alt={repositorioInfo.owner.login}
                />
                <h1>{repositorioInfo.name}</h1>
                <p>{repositorioInfo.description}</p>
            </Owner>
        </Container>
    )
}