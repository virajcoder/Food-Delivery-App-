import { createAsyncThunk } from "@reduxjs/toolkit";

const loginHandler = createAsyncThunk("auth/login", async () => {
    let res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: 'kminchelle',
            password: '0lelplR',
        })
    })

    let data = await res.json()
    localStorage.setItem("user", JSON.stringify(data));

    return data;
});

export default loginHandler;