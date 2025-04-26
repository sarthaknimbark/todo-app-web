import Navbar from './components/Navbar';
import TodoContainer from './components/TodoContainer';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <TodoContainer />
      </Container>
    </>
  );
}

export default App;
