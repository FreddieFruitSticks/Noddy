import Home from "../src/lib/home"
import { fetchPosts } from "../src/services"

export const getStaticProps = async (context) => {
    return {
        props:{}
    }
  }

function PartyDetails({posts}) {
    return (
            <div>
                Party Details
            </div>
            
    )
}

export default PartyDetails