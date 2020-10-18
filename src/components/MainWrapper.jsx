import MainNavbar from "./MainNavbar"


const MainWrapper = ({children}) => {
    return (
        <>
            <MainNavbar/>
            {children}
        </>
    )
}

export default MainWrapper