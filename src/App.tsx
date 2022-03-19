import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// @page
import ConnectWallet from "pages/connect-wallet";

// @components
import WalletProviderSection from "components/WalletProvider/WalletProvider";

import "App.scss";
import "react-notifications/lib/notifications.css";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <WalletProviderSection>
      <ConnectWallet />
    </WalletProviderSection>
  );
};

export default App;
