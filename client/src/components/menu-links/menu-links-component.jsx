const MenuLinks = ({ pencil, dotMenuBlack }) => {
    const menuLinks = [
        { label: 'View statistics about employee performance on the dashboard.', icon: <span>📊</span>, url: '/dashboard' },
        { label: 'Manage your team effectively.', icon: <span>👥</span>, url: '/employees' },
        { label: 'Explore and organize different departments within your organization.', icon: <span>🏢</span>, url: '/departments' },
        { label: 'Generate and analyze reports for your organization.', icon: <span>📈</span>, url: '/reports' },
        { label: 'Customize application settings to fit organization.', icon: <span>⚙️</span>, url: '/settings' },
      ];
  return (
    <div className="flex flex-col menu-links-component-container w-full justify-between p-2">
      <div className="flex justify-between">
        <p className="text-lg">Menu Links</p>
        <div className="flex">
          {pencil}
          {dotMenuBlack}
        </div>
      </div>

      {/* Render menu links */}
      <div className="flex flex-col">
        {menuLinks.map((link, index) => (
          <a key={index} href={link.url} className="mx-2 py-3">
            <span className="ml-1 text-blue-500 underline hover:text-blue-700 cursor-pointer">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MenuLinks;
