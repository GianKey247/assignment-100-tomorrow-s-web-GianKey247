import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import "./Portal.css"
const Portal = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Create portal container if it doesn't exist
        if (!document.getElementById('modal-root')) {
            const portalRoot = document.createElement('div');
            portalRoot.setAttribute('id', 'modal-root');
            document.body.appendChild(portalRoot);
        }

        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
        children,
        document.getElementById('modal-root')
    );
};

export default Portal;