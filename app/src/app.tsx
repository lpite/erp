import { Route, Switch } from "wouter";
import { ProductPage } from "./pages/product-page";
import { EditorPage } from "./pages/editor-page";
import { TestEditorPage } from "./pages/test-editor-page";
import { ProductListPage } from "./pages/product-list-page";

import { IncomeDocumentListPage } from "./pages/income-document-list-page";
import { IncomeDocumentPage } from "./pages/income-document-page";

import ReportsPage from "./pages/reports-page";
import { SalesDocumentListPage } from "./pages/sales-document-list-page";
import SalesDocumentPage from "./pages/sales-document-page";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={ProductListPage} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/editor" component={EditorPage} />
        <Route path="/test" component={TestEditorPage} />
        <Route
          path="/list/income-document"
          component={IncomeDocumentListPage}
        />
        <Route path="/income-document/:id" component={IncomeDocumentPage} />
        <Route
          path="/list/sales-document"
          component={SalesDocumentListPage}
        />
         <Route
          path="/sales-document/:id"
          component={SalesDocumentPage}
        />
        <Route path="/reports" component={ReportsPage} />
      </Switch>
    </>
  );
}

export default App;
