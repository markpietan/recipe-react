import { useState } from "react";
const INITIAL_STATE = {
  header: "",
  content: "",
  error: false,
  success: false,
};
function useMessage(history) {
  const [messageVisible, setmessageVisible] = useState(false);
  const [messageConfig, setmessageConfig] = useState(INITIAL_STATE);
  function showMessage(config = { ...INITIAL_STATE }, sendToPath = "") {
    setmessageVisible(true);
    setmessageConfig(config);
    setTimeout(() => {
    hideMessage()
      if (sendToPath !== "") {
        history.push(sendToPath);
      }
    }, 2000);

  }
  function hideMessage(){
      setmessageVisible(false)
      setmessageConfig(INITIAL_STATE)
  }
  return [showMessage, messageVisible, hideMessage, messageConfig]
}

export default useMessage;
