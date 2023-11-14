const { useState, useEffect } = require("react");
const { useAuth } = require("../../contexts/auth.context");
const { Outlet } = require("react-router-dom");



const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated, fetchUser } = useAuth();

    useEffect(() => {
        const refreshLogin = async () => {
            try {
                await fetchUser();
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setIsLoading(false);
            }
        }
        !isAuthenticated ? refreshLogin() : setIsLoading(false);
    }, [])

    return (
        <>
        {isLoading
        ? <p>Loading...</p>
        : <Outlet />}
        </>
    )
}
export default PersistLogin;