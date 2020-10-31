import React from 'react'
<<<<<<< HEAD
import withPrivatePage from "@hocs/withPrivatePage"
=======
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
import AdminPanelWrapper from "@components/admin/AdminPanelWrapper"

const AdminIndex = () => {
    return (
        <AdminPanelWrapper>
            <h1>Вы находитесь в административной панели</h1>
        </AdminPanelWrapper>
    )
}

<<<<<<< HEAD
export default withPrivatePage(AdminIndex)
=======
export default AdminIndex
>>>>>>> 01314a2... Private routes, SWR, remove orders, validation
