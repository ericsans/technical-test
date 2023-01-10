import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/navbar";

import Home from "./components/home";
import CustomerForm from "./components/customers/form";
import Customers from "./components/customers";
import SupplierForm from "./components/suppliers/form";
import Suppliers from "./components/suppliers";
import ProductForm from "./components/products/form";
import Products from "./components/products";
import LoginForm from "./components/users/login";
import LogoutForm from "./components/users/logout";
import UserForm from "./components/users/form";
import Users from "./components/users";
import SalesInvoiceForm from "./components/salesInvoices/form";
import SalesInvoices from "./components/salesInvoices";
import { getCurrentUser } from "./services/authenticationService";

function App() {
    return (
        <div className="container">
            { getCurrentUser() && <Navbar />}
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/logout" element={<LogoutForm />} />

                <Route path="/customer/add" element={<CustomerForm />} />
                <Route path="/customer/edit/:id" element={<CustomerForm />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/supplier/add" element={<SupplierForm />} />
                <Route path="/supplier/edit/:id" element={<SupplierForm />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/product/add" element={<ProductForm />} />
                <Route path="/product/edit/:id" element={<ProductForm />} />
                <Route path="/products" element={<Products />} />
                <Route path="/user/add" element={<UserForm />} />
                <Route path="/user/edit/:id" element={<UserForm />} />
                <Route path="/users" element={<Users />} />

                <Route path="/sales-invoice/add" element={<SalesInvoiceForm />} />
                <Route path="/sales-invoice/edit/:id" element={<SalesInvoiceForm />} />
                <Route path="/sales-invoices" element={<SalesInvoices />} />

                <Route path="/home" element={<Home />} />
                <Route exact path="/" element={<Navigate to={"/home"} />} />
            </Routes>
        </div>
    );
}

export default App;
