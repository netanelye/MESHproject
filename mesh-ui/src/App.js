import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from '../src/pages/Home'
import Favorites from '../src/pages/Favorites'
import Personal from '../src/pages/Personal'
import { useStyles } from './styles/styles'
import Layout from './components/Layout'
import { Container } from '@material-ui/core'

const App = () => {
  const classes = useStyles();

  return (
    <Container elementType='div' maxWidth='sm'>

      <Router>
        <Layout>

          <Navigation/>
      
          <div>
            <div className={classes.appBarSpacer} ></div>
            <Switch>
              <Route exact key="0" path="/" > <Home/> </Route>
              <Route exact key="1" path="/personal"> <Personal/> </Route>
              <Route exact key="2" path="/favorites"> <Favorites/> </Route>
            </Switch>
          </div>

        </Layout>
      </Router>
    </Container>
  )
}

export default App
