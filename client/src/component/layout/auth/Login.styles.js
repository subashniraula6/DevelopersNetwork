import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export const SigninContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
export const SignInWrapper = styled.div`
width: 70%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media screen and (max-width: 700px){
    width: 100%;
}
`

export const Form = styled.form`
width: 80%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media screen and (max-width: 700px){
    width: 100%;
}
`

export const EmailInput = styled(TextField)`
width: 100%;
`
export const PasswordInput = styled(TextField)`
width: 100%;
`
export const SubmitButton = styled(Button)`
width: 60%;
margin-top: 30px !important;
`
export const InputContainer = styled.div`
display: flex;
align-items: flex-end;
justify-content: center;
width: 100%;
margin: 10px 0;
`