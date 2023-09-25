import { Spin, SpinProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined spin />;

export function Spinner(props: SpinProps) {
  return <Spin {...props} indicator={antIcon} />;
}
