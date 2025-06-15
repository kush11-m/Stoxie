export default function FooterColumn({ title, items }) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-purple-500 mb-4">{title}</h3>
        {typeof items === 'string' ? (
          <p className="text-sm text-gray-500 leading-relaxed">{items}</p>
        ) : (
          <ul className="space-y-3 text-sm">
            {items.map((item, index) => (
              <li key={index}>
                <a href="#" className="text-gray-500 hover:text-purple-500 transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}
  