import Home from "../src/lib/home"
import { fetchPosts } from "../src/services"

export const getStaticProps = async (context) => {
    return {
        props:{}
    }
  }

function HomePage({posts}) {
    return (
            <Home/>
            
    )
}

export default HomePage