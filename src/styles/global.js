import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin:0;
        padding:0;
        outline:0;
        box-sizing: border-box;
    }

    html, body, #root{
        min-height: 100%;
    }

    body{
        background: radial-gradient(105.93% 228.48% at 3.2% 7.73%, #96E5AC 0%, #14CBBF 15.9%, #0CBAC1 34.4%, #087C8B 65.57%, #033951 100%);
        font-size: 14px;
        -webkit-font-smoothing: antialiased !important;
    }

    body, input, button{
        color: #033951;
        font-size: 14px;
        font-family: Inter;
    }

    button{
        cursor: pointer;
    }
`;
