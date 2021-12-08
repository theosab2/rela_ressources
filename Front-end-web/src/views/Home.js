import Header from "../components/Header";

const Home = () => {

  const [state, setstate] = useState(initialState)
    const changeState = () =>{
      
    }
    return (
      <div>
          <Header/>
          <h1>Accueil</h1>
          <div>{state}</div>
      </div>
    );
  }
  
  export default Home;