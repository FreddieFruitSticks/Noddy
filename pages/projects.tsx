import Home from "../src/lib/home"
import { fetchPosts } from "../src/services"

export const getStaticProps = async (context) => {
    return {
        props:{}
    }
  }

function ProjectsPage({posts}) {
    return (
        <div>
            Projects
        </div> 
    )
}

export default ProjectsPage