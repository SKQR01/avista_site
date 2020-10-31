import React, {useEffect} from 'react'
import useAdmin from "@utils/useAdmin"
import Nav from "react-bootstrap/Nav"

const AdminPanelWrapper = ({children}) => {
    const {isAdmin} = useAdmin({redirectTo: '/signin'})
    if (!isAdmin || typeof isAdmin === "undefined") {

        return <div>
            <h1>У вас нет прав, чтобы продолжить.</h1>
        </div>
    }

    return (
        <div>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="/home">Active</Nav.Link>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav>
        </div>
    )
}

export default AdminPanelWrapper