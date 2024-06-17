import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute is a wrapper component that checks if a user is authenticated.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.user - The user object. If defined, the user is considered authenticated.
 * @param {ReactNode} props.children - The children components to render if the user is authenticated.
 * 
 * @returns {ReactNode} If the user is authenticated, it returns the children components. 
 *                      If the user is not authenticated, it redirects the user to the login page.
 */
function ProtectedRoute({ user, children }) {
  let location = useLocation();

  if (!user.user_id) {
    // If the user is not logged in, redirect to the login page.
    console.log('PROTECTED ROUTE: User is not logged in. Redirecting to login page. User: ', user);
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If the user is logged in, render the children components.
  return children;
}

export default ProtectedRoute;