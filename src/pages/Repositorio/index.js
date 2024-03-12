import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../../services/api'
import { Container, Owner, Loading, BackButton, IssuesList, PageAction, FilterList } from "./styles";
import {FaArrowLeft} from 'react-icons/fa'

export default function Repositorio() {
    const { repositorio } = useParams()

    const [repositorioInfo, setRepositorioInfo] = useState({});
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1);
    const [filter, setFilters] = useState([
        {state: 'all', label: 'Todas', active: true},
        {state: 'open', label: 'Abertas', active: false},
        {state: 'closed', label: 'Fechadas', active: false}
    ])
    const [filterIndex, setFilterIndex] = useState(0)

    useEffect(() => {

        async function load() {
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`repos/${repositorio}`),
                api.get(`repos/${repositorio}/issues`, {
                    params: {
                        state: filter[filterIndex].state,
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

    }, [repositorio, page, filterIndex, filter])

    function handlePage(action){
        setPage(action === 'back' ? page -1 : page + 1)
    }

    function handleFilter(index){
        setFilterIndex(index)
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

            <FilterList active={filterIndex}>
                {filter.map((filter, index)=> (
                    <button type="button"
                    key={filter.label}
                    onClick={()=> handleFilter(index)}>
                        {filter.label}
                    </button>
                ))}
            </FilterList>

            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        {console.log(issue)}
                        <img src={issue.user.avatar_url} alt={issue.user.login}/> 
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a><br/>
                                <p>Etiquetas:</p>
                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </strong>
                            <p>Criador: {issue.user.login}</p>
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