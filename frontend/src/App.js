import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

// Components
import {
  Auth, Dashboard, Profile, Quote, ResponsibleCompany, ResponsibleCompanyList,
  ProductList, Product, ServiceList, Service, CustomerList, Customer,
} from './pages'
import { ResponsiveDrawer } from './components'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA836', // Orange
    },
    secondary: {
      main: '#FFD7B5', // Light Orange
    },
    background: {
      default: '#FBFBFB', // Light Grey
    },
  },
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ResponsiveDrawer content={<Dashboard />} />} />
          <Route path='auth/' element={<Auth />} />
          <Route path='quotes/' element={<ResponsiveDrawer content={<Quote />} />} />
          <Route path='profiles/' element={<ResponsiveDrawer content={<Profile />} />} />
          <Route path='responsible_companies/' element={<ResponsiveDrawer content={<ResponsibleCompanyList />} />} />
          <Route path='responsible_companies/:id' element={<ResponsiveDrawer content={<ResponsibleCompany />} />} />
          <Route path='products/' element={<ResponsiveDrawer content={<ProductList />} />} />
          <Route path='products/:id' element={<ResponsiveDrawer content={<Product />} />} />
          <Route path='services/' element={<ResponsiveDrawer content={<ServiceList />} />} />
          <Route path='services/:id' element={<ResponsiveDrawer content={<Service />} />} />
          <Route path='customers/' element={<ResponsiveDrawer content={<CustomerList />} />} />
          <Route path='customers/:id' element={<ResponsiveDrawer content={<Customer />} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
