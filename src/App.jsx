import GlobalStyle from "./utils/GlobalStyle.js";
import { HashRouter  } from "react-router-dom";
import RouterLink from "./router/router";
function App() {

  return (
    <div>
        <HashRouter>
            <RouterLink />
            <GlobalStyle />
        </HashRouter>

    </div>
  )
}

export default App
