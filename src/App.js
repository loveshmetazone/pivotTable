import './App.css';
import PivotTable from "./components/PivotTable/PivotTable";
import {Provider} from "react-redux";
import store from "../src/reduxState/store/index"
import {LicenseInfo} from "@mui/x-license-pro";

function App() {

    LicenseInfo.setLicenseKey('20a7583e6b7d488908f8748baeb00c8dTz00NjA2OSxFPTE2ODc0NDAxNDUzMjMsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y');

    return (
        <Provider store={store}>
            <div className="App">
                <PivotTable/>
            </div>
        </Provider>
    );
}

export default App;
