import { Button } from 'antd';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '~/presentation/assets/Icons';
import { useLabeledLayoutStyles } from '~/presentation/layouts/Labeled/LabeledLayout.styles';

interface Props extends PropsWithChildren {
  label: string;
  rightAdornment?: React.ReactNode;
  leftAdornment?: React.ReactNode;
  onBack?: () => void;
  noBackBtn?: boolean;
}

export function LabeledLayout({
  label,
  children,
  rightAdornment,
  leftAdornment,
  onBack,
  noBackBtn = false,
}: Props) {
  const navigate = useNavigate();
  const classes = useLabeledLayoutStyles();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div>
      <div className={classes.head}>
        <div className={classes.left}>
          {!noBackBtn && (
            <Button
              type="text"
              onClick={handleBack}
              icon={<Icons.ChevronLeft />}
              className={classes.backBtn}
            />
          )}
          <h1 className={classes.label}>{label}</h1>
          {leftAdornment}
        </div>
        {rightAdornment}
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
