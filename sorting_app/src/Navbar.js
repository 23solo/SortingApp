export default function Navbar() {
    return <nav className="nav">
        <a className ="nav-item" href="/">Home</a>
        <ul>
            <li className="nav-item">
                <a href="/sorting_visualizer">Sorting Visualiser</a>
            </li>
            <li className="nav-item">
                <a href="/sde_sheet">SDE Sheet</a>

            </li>
        </ul>
    </nav>
}
