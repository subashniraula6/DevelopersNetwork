import styled from 'styled-components'

export const RegisterContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
export const RegisterWrapper = styled.div`
width: 70%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

@media screen and (max-width: 700px) {
    width: 100%;
}
`
export const Form = styled.form`
width: 80%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

@media screen and (max-width: 700px) {
    width: 100%;
}
`
export const InputContainer = styled.div`
display: flex;
align-items: flex-end;
justify-content: center;
width: 100%;
margin: 10px 0;
`