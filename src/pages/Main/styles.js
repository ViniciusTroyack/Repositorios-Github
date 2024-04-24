import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: calc(1.8rem + 4vw);
  font-weight: 900;
  line-height: 1.2;
  text-align: center;
  color: #ffff;

  span {
    -webkit-text-stroke: 2px #ffff; /* Contorno preto com 2px de largura */
    color: transparent; /* Torna o texto transparente */
  }
`;

export const ReposContainer = styled.div`
  display: ${(props) => (props.hasrepo ? "block" : "none")};
  width: 100%;
  max-width: 44rem;
  min-width: 300px;
  background: #ffffff4f;
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  input {
    flex: 1;
    border: 1px solid ${(props) => (props.error ? "#FF0000" : "#eee")};
    padding: 5px 15px;
    border-radius: 35px;
    margin: 8px;
    font-weight: 500;
    width: calc(100% - 30px);
    height: 54px;
    min-width: 300px;
    font-size: 16px;
  }
`;

const animate = keyframes`
    from{
        transform: rotate(0deg)
    }
    to{
        transform: rotate(360deg)
    }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: "submit",
  disabled: props.loading,
}))`
  background: transparent;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `};
`;

export const List = styled.ul`
  list-style-type: style none;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-family: Inter;
    font-size: 1.4rem;
    font-weight: 600;
    text-align: left;
    color: #ffffff;

    & + li {
      border-top: 1px solid #ffffff;
    }

    a {
      color: #0d2636;
      text-decoration: none;
    }

    p {
      max-width: 70%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;
    }
  }
`;

export const DeleteButton = styled.button.attrs({
  type: "button",
})`
  margin-left: 6px;
  background: transparent;
  color: #0d2636;
  border: 0;
  padding: 8px 7px;
  outline: 0;
  border-radius: 4px;
`;
