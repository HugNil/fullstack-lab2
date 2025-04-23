import ProjectAssignment from './components/ProjectAssignment.jsx';
import Header from './components/Header.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header /> {/* This component displays the header of the app */}
      <main>
        <ProjectAssignment /> {/* This component fetches the data from the server and displays it in a table */}
      </main>
    </div>
  );
}
export default App;
