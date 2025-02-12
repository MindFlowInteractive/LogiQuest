import { Link } from "react-router";


function DummyNav() {
    return (
        <nav>
            <Link to="/" > Home</Link>
            <Link to="/page1" > page 1</Link>
            <Link to="/page2"> page 2</Link>
        </nav>
    )
}


export default DummyNav;