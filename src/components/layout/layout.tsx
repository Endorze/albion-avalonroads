import { Outlet } from "react-router-dom";
import styles from "./layout.module.css"

const Layout = () => {
    return (
    <>
    <header className={styles.header}>
        <h1>Roads of Avalon DB</h1>
        <p>The Phoenix Order</p>
    </header>
    <Outlet />
    <footer>
        {/* Footer */}
    </footer>
    </>
    )
}

export default Layout;