declare module 'react-scroll' {
  interface ScrollLinkProps {
    to: string;
    spy?: boolean;
    smooth?: boolean;
    offset?: number;
    duration?: number;
    className?: string;
    activeClass?: string;
    onClick?: () => void;
  }

  export const Link: React.FC<ScrollLinkProps & {
    children: React.ReactNode;
  }>;
}
