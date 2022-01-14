import Navigation from "../Navigation";

export default function Home(props){
    return( 
    <>
        <Navigation></Navigation>
        <h1>{props.data}</h1>
    </>
    )
}

export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const data = "test"
  
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: data
    }
  }