import { IconWarning } from '../Icon';

export default function FormIcons({ icons, ...otherProps }) {
  return (
    <bolt-input-icons {...otherProps}>
      <ul className="o-bolt-inline-list o-bolt-inline-list--xsmall">
        {/* The invalid icon is always added; it's simply shown or hidden using CSS and javascript */}
        <li className="o-bolt-inline-list__item">
          <div className="c-bolt-input-icon--invalid">
            <IconWarning size="medium" />
          </div>
        </li>
        {icons &&
          icons.map(icon => {
            if (icon.content) {
              return (
                <li className="o-bolt-inline-list__item">
                  {icon.isSubmit ? (
                    <button
                      className="c-bolt-input-icon c-bolt-input-icon--link"
                      type="submit">
                      {icon.content}
                    </button>
                  ) : (
                    <div className="c-bolt-input-icon">{icon.content}</div>
                  )}
                </li>
              );
            }
          })}
      </ul>
    </bolt-input-icons>
  );
}
