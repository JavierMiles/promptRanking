import { Icon } from './icon';

export interface FloatingAdminButtonProps {
  href?: string;
  className?: string;
}

export const FloatingAdminButton = ({ 
  href = '/admin'
}: FloatingAdminButtonProps) => {
  return (
    <div className="fixed top-0 left-20 z-50">
      <a
        href={href}
        className={`
          inline-flex items-center justify-center gap-2 px-3 py-1
          text-sm font-medium
          bg-orange-700 opacity-80 hover:opacity-100
          text-white
          rounded-b-md
          transition-all duration-200 cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2
        `}
      >
        <Icon name="admin_panel_settings" size={1} />
        <span>Admin</span>
      </a>
    </div>
  );
};