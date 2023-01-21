import styled from "styled-components";

export const IconWithText = styled.div`
width: 250px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: flex-start;
    -webkit-align-content: center;
    -ms-flex-line-pack: center;
    align-content: center;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
img{
    height:200px;
    width:auto;
    padding:1em;
    margin:1em;
}
p{
    color:#ffff;
    font-size:1.5em;
    text-align:center;
    font-weight:200;
}
`