import { useState, useCallback, useEffect } from "react";
import {
  Container,
  ReposContainer,
  Form,
  SubmitButton,
  List,
  DeleteButton,
  Title,
} from "./styles";
import { FaSpinner, FaRegTrashAlt } from "react-icons/fa";
import { RiGitRepositoryLine } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [newRepoUser, setNewRepoUser] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const repoStorage = JSON.parse(localStorage.getItem("repos"));

    if (repoStorage) {
      setRepositorios(repoStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repositorios));
  }, [repositorios]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(null);
        try {
          if (newRepo === "") {
            throw new Error("Você precisa indicar um repositorio!");
          }

          const response = await api.get(`repos/${newRepoUser}/${newRepo}`);

          const hasRepo = repositorios.find((repo) => repo.name === newRepo);

          if (hasRepo) {
            throw new Error("Repositorio Duplicado");
          }

          const data = {
            name: response.data.full_name,
          };

          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
          setAlert(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositorios]
  );

  function handleRepoInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null);
  }

  function handleUserInputChange(e) {
    setNewRepoUser(e.target.value);
    setAlert(null);
  }

  const handleDelete = useCallback(
    (repo) => {
      const find = repositorios.filter((r) => r.name !== repo);
      setRepositorios(find);
    },
    [repositorios]
  );

  return (
    <Container>
      <Title>
        REPO<span>FIND</span>
      </Title>
      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Nome do usuario"
          value={newRepoUser}
          onChange={handleUserInputChange}
        />
        <input
          type="text"
          placeholder="Nome do Repositório"
          value={newRepo}
          onChange={handleRepoInputChange}
        />
        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFFF" size={14} />
          ) : (
            <IoIosAddCircle color="#FFF" size={44} />
          )}
        </SubmitButton>
      </Form>
      <ReposContainer hasrepo={repositorios.length}>
        <List>
          {repositorios.map((repo) => (
            <li key={repo.name}>
              <p>{repo.name}</p>
              <span>
                <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                  <RiGitRepositoryLine size={20} color="#ffff" />
                </Link>
                <DeleteButton onClick={() => handleDelete(repo.name)}>
                  <FaRegTrashAlt size={20} color="#ffff" />
                </DeleteButton>
              </span>
            </li>
          ))}
        </List>
      </ReposContainer>
    </Container>
  );
}
