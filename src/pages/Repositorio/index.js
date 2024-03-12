import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../../services/api'
import { Container, Owner, Loading, BackButton, IssuesList, PageAction } from "./styles";
import {FaArrowLeft} from 'react-icons/fa'

export default function Repositorio() {
    const { repositorio } = useParams()

    const [repositorioInfo, setRepositorioInfo] = useState({});
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1);

    useEffect(() => {

        async function load() {
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`repos/${repositorio}`),
                api.get(`repos/${repositorio}/issues`, {
                    params: {
                        state: 'open',
                        page: page,
                        per_page: 5,
                    }
                })
            ]);

            setRepositorioInfo(repositorioData.data)
            setIssues(issuesData.data)
            setLoading(false)
        };

        load();

    }, [repositorio, page])

    function handlePage(action){
        setPage(action === 'back' ? page -1 : page + 1)
    }


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

            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        {console.log(issue)}
                        <img src={issue.user.avatar_url} alt={issue.user.login}/> 
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a><br/>
                                <p>Labels:</p>
                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>
            <PageAction>
                <button type="button" disabled={page < 2} onClick={() => handlePage('back')}>Voltar</button>
                <button type="button" onClick={() => handlePage('next')}>Proxima</button>
            </PageAction>
        </Container>
    )
}