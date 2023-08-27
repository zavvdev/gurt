import cx from 'clsx';
import { Svg } from '~/presentation/assets/Svg';
import {
  useThemeSwitch,
  Theme,
} from '~/presentation/widgets/ThemeSwitch/hooks/useThemeSwitch';

export function ThemeSwitch() {
  const { theme, setTheme } = useThemeSwitch();

  const options = [
    {
      content: <Svg.Sun className="w-4" />,
      isActive: theme === Theme.Light,
      onClick: () => setTheme(Theme.Light),
    },
    {
      content: <Svg.Desktop className="w-4" />,
      isActive: theme === Theme.System,
      onClick: () => setTheme(Theme.System),
    },
    {
      content: <Svg.Moon className="w-4" />,
      isActive: theme === Theme.Dark,
      onClick: () => setTheme(Theme.Dark),
    },
  ];

  return (
    <div className="flex items-center gap-2 justify-center rounded-full	border p-0.5 dark:border-gray-600">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={option.onClick}
          className={cx(
            `rounded-full w-6 h-6 p-0.5 text-gray-500 text-xs 
            hover:text-gray-700 dark:hover:text-gray-100 flex
            items-center justify-center`,
            {
              'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-100':
                option.isActive,
            },
          )}
        >
          {option.content}
        </button>
      ))}
    </div>
  );
}
