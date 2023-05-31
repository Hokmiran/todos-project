import './App.css';
// import Footer from './components/Footer';
import Header from './components/Header';
import Todos from './components/Todos';

function App() {
  return (
    <section className="todoapp">
      <Header />

      <Todos />

      {/* <Footer /> */}
    </section>
  );
}

export default App;
