import { ComponentType } from "react";
import { useSelector } from "react-redux";

import { PWithModal } from "../../utils";

const withModal =
  <P extends PWithModal>(WrappedComponent: ComponentType<P>) =>
  (props: P) => {
    const modal = useSelector((state: PWithModal): string => state.modal);

    return <WrappedComponent {...props} modal={modal} />;
  };

export default withModal;
