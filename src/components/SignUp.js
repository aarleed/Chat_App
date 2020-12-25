import React, {useEffect} from 'react';
import { Grommet, Box, TextInput, Select, FormField, Button, Heading } from 'grommet';
import { useHistory, withRouter } from 'react-router-dom';

const SignUp = (props) => {
    const [gender, setGender] = React.useState('other');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const history = useHistory();

    /**
     * Send a POST request to the server, and the
     * redirect to login.
     * Server adds user.
     */
    const handleSubmission = () => {
        // alert(`${gender} ${password} ${email}`)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept':'application/json' },
            body: JSON.stringify({ name: email, pass: password, gender: gender })
        };
        props.handleSignIn({ email: email, pass: password, gender: gender });
        // console.log(props);
        fetch('/signup', requestOptions).then(res => res.json()).then(data => {
            history.push(`/login`)
          });
    }
    
    
    useEffect(() => {
        // console.log(props)
      }, []);

    return (
        <Grommet>
            <Box fill align="center" justify="center" fill background="#3279a8" >
                <Box width="medium" height="large">
                    <Heading margin={{top: "large" }} level='2' color="white">Sign Up</Heading>

                    <br />
                    <Box>
                        <FormField label="Email">
                            <TextInput placeholder="email" type="email" value={email} onChange={event => setEmail(event.target.value)} />
                        </FormField>
                    </Box>
                    <br />
                    <Box>
                        <FormField label="Password">
                            <TextInput placeholder="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
                        </FormField>
                    </Box>
                    <br />
                    
                    <Box>
                        <FormField label="Gender">
                            <Select
                                options={['man', 'woman', 'other']}
                                value={gender}
                                onChange={({ option }) => setGender(option)}
                            />
                        </FormField>
                    </Box>
                    <br />
                    
                    <Box >
                        <Button primary label="Sign Up" color = "#098589" onClick={handleSubmission} />
                    </Box>
                </Box>
            </Box>
        </Grommet>
    );
}

export default withRouter(SignUp);