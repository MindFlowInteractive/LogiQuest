import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            {/* Layout content */}
            {children}
        </div>
    );
};

export default Layout;