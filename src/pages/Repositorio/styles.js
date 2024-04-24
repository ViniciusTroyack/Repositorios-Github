import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  max-width: 80vh;
  border-radius: 4px;
  padding: 30px;
  margin: 80px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
    border-radius: 20%;
    margin: 20px 0;
  }

  h1 {
    font-size: 2rem;
    color: #0d2636;
  }

  p {
    margin: 5px 0px;
    font-size: 1.1rem;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const IssuesList = styled.ul`
  padding-top: 20px;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    background: #ffffff4f;
    border-radius: 30px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

    & + li {
      margin-top: 12px;
    }

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      border: 2px solid #0d2636;
    }

    div {
      flex: 1;
      margin-left: 12px;

      P {
        margin-top: 10px;
        font-size: 12px;
      }
    }

    strong {
      font-size: 15px;

      a {
        text-decoration: none;
        color: #033951;
        transform: 0.3s;

        &:hover {
          color: #0071db;
        }
      }

      span {
        background: #033951;
        color: #fff;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 7px;
        margin: 1px 2px;
        display: inline-block;
      }
    }
  }
`;

export const PageAction = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    outline: 0;
    width: 8rem;
    border: 0;
    padding: 8px;
    border-radius: 20px;
    margin: 0 3px;
    font-weight: 800;
    background-color: #ffffff;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: #85f6fb;
    }
  }
`;
export const FilterList = styled.div`
  margin: 15px 0;

  button {
    outline: 0;
    width: 5rem;
    border: 0;
    padding: 8px;
    border-radius: 20px;
    margin: 0 3px;
    font-weight: 600;
    background-color: #85f6fb;

    &:nth-child(${(props) => props.active + 1}) {
      background: #fff;
      color: #12c6c0;
    }
  }
`;
