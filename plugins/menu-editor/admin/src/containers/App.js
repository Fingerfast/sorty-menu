import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from 'strapi-helper-plugin';
import pluginId from '../pluginId';
import MenuEditorPlugin from './MenuEditorPlugin';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={MenuEditorPlugin} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
