import React from 'react'
import withPrivatePage from "@hocs/withPrivatePage"
import AdminPanelWrapper from "@components/admin/AdminPanelWrapper"

const AdminIndex = () => {
    return (
        <AdminPanelWrapper>
            <h1>Вы находитесь в административной панели</h1>
        </AdminPanelWrapper>
    )
}

export default withPrivatePage(AdminIndex)