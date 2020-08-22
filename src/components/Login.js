import React from 'react';
// import loftlyTheme from './Theme';
import { Box, Heading, TextInput, Button, Text, Grommet, Grid} from 'grommet';
const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmission = async () => {
        console.log(JSON.stringify({ email, password }));
    }

    return (
        <Grommet>
            <Box fill background="#3279a8">
                <Grid
                     fill rows={["auto", "flex"]}
                     columns={["auto", "flex"]}
                     gap="small"
                     areas={[
                        { name: 'header', start: [0, 0], end: [1, 0] },
                        { name: 'login', start: [0, 1], end: [0, 1] },
                        { name: 'main', start: [1, 1], end: [1, 1] }
                     ]}

                >
                <Box
                direction="row"
                gridArea = "header"
                align="center"
                justify="around"
                fill="horizontal"
                border={"bottom", { size:'medium', side:'bottom'}}
                pad={{ right: "xsmall", left: "xsmall" }}
                >
                <Heading margin="medium" alignSelf="start" level='1' color="white">Chat App</Heading>
                
                </Box> {/* end header box */}
                    <Box  
                    background="white" 
                    margin={{ left: "xlarge",top: "large" }} 
                    gridArea="login" justify="start" 
                    align="center" 
                    width="medium" 
                    height="large" 
                    direction="column" 
                    pad="medium" 
                    round="small" 
                    border={{ color: 'white', size: 'large' }} >
                        <Heading margin="none" level="3" alignSelf="start">Login</Heading>
                        <br />
                        <Box width="medium">
                            <TextInput
                                placeholder="email"
                                value={email}
                                type="email"
                                onChange={event => setEmail(event.target.value)}
                            />
                        </Box>
                        <br />
                        <Box width="medium">
                            <TextInput
                                placeholder="password"
                                value={password}
                                type="password"
                                onChange={event => setPassword(event.target.value)}
                            />
                        </Box>
                        <br />
                        <Box width="medium" direction = "row" >

                            <Button primary label="Login" color = "#098589" onClick={handleSubmission} />
                        </Box>
                        <hr />
                        <Text alignSelf="start">Don't have an account? <a href="/signup" >Sign up</a></Text>
                    </Box> {/* end login box */}
                    <Box
                    gridArea = "main"
                    alignContent = "end"
                    justify = "end"
                    direction = "row"
                    >  
                    </Box>
                </Grid>
            </Box>
        </Grommet>
    )
}

export default Login;