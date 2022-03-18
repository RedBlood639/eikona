import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

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
      <Switch>
        <Route exact path="/" component={ConnectWallet} />
      </Switch>
    </WalletProviderSection>
  );
};

export default App;
