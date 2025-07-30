import {useRouterState} from "@tanstack/react-router";

const Navbar = () => {
    const {location: {pathname}} = useRouterState();
    const disallowedRoutes = new Set(['/login', '/sign-up', 'forgot-password', 'reset-password']);

    if(disallowedRoutes.has(pathname)) {
        return null;
    }

    return (
        <div>
            Navbar element
        </div>
    )
}

export default Navbar;