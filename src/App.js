import { Component, createContext, useContext, useState } from 'react'
import logo from './logo.svg'
import './App.css'

const ThemeContext = createContext('light')
const LanguageContext = createContext({ language: 'pl', setLanguage: () => {} })

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

const toggle = (...args) => state => (state === args[0] ? args[1] : args[0])

function App() {
  const [theme, setTheme] = useState('dark')
  // const [language, setLanguage] = useState('en')

  function toggleTheme() {
    setTheme(toggle('light', 'dark'))
  }

  return (
    <ThemeContext.Provider value={theme}>
      {/* <LanguageContext.Provider value={{ language, setLanguage }}> */}
      <LanguageProvider>
        <div className="App">
          <header className={`App-header ${theme}`}>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              <button onClick={toggleTheme}>Toggle theme</button>
            </p>

            <Buttons />

            <FunctionComponentWithHooks />
            <ClassComponentWithConsumers />

            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
        {/* </LanguageContext.Provider> */}
      </LanguageProvider>
    </ThemeContext.Provider>
  )
}

export default App

function FunctionComponentWithHooks() {
  const theme = useContext(ThemeContext)
  const { language } = useContext(LanguageContext)

  return (
    <p>
      Function
      <br />
      Theme: {theme} | Language: {language}
    </p>
  )
}
class ClassComponentWithConsumers extends Component {
  render() {
    return (
      <LanguageContext.Consumer>
        {({ language }) => (
          <ThemeContext.Consumer>
            {theme => (
              <p>
                Class
                <br />
                Theme: {theme} | Language: {language}
              </p>
            )}
          </ThemeContext.Consumer>
        )}
      </LanguageContext.Consumer>
    )
  }
}

const copy = {
  en: 'Hello!',
  pl: 'Cześć!'
}

function Buttons() {
  const { language, setLanguage } = useContext(LanguageContext)

  return (
    <div>
      <div>{copy[language]}</div>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('pl')}>Polish</button>
    </div>
  )
}
