import React, {useState} from 'react'
import axios from 'axios'
import qs from 'qs';


import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });

const BACKEND_API_URI = 'http://localhost:3001';

class backend {  
    static user_token = cookies.get('user_token') || ""

    // General request to automatically include token 

    static async request(endpoint, data = {}, method = "GET") {
        const url = `${BACKEND_API_URI}${endpoint}`;
        const headers = { authorization: `Bearer ${backend.user_token}`};
        const params = (method === "GET")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("Backend API Error:", err.response);
        }
    }

    // Users individual routes

    static async register(data) {
        return await backend.request(`/users/register`, data, 'post').then((res => {message: 'Register Complete!'}))
    }

    static async login(formData) {
        try {
            return await this.request(`/users/login`, formData, 'post')
                .then((res) => {
                    let {token, user} = res
                    cookies.set('user_token', token)
                    cookies.set('user', user)
                    backend.user_token = cookies.get('user_token') || ""
                    return user
                })
        } catch (err) {
            console.log(err.data)
            return err.data
        }
    }

    static async delUser(formData) {
        try {
            return await this.request(`/users/${cookies.get('user')}`, formData, 'delete')
                .then((res) => res)
        } catch (err) {
            return err
        }
    }

    static async getUserRecipes() {
        try{
            return await backend.request(`/users/myrecipes`).then((res) => res)
        } catch (err) {
            return err
        }
    }

    // Recipes individual routes

    static async getRecipeIngredients(ref_id) {
        return await backend.request(`/recipes/getRecipe/${ref_id}`)
    }

    static async searchByIngredients(items) {
        try {
            const ingrList = qs.stringify({ ingredients: items }, { arrayFormat: 'comma' })
            return await axios({
                url: `${BACKEND_API_URI}/recipes/search?${ingrList}`,
                method: "GET",
                headers: { authorization: `Bearer ${backend.user_token}`},
            }).then((res) => res)
        } catch (err) {
            return err
        }
    }

    static async getInstructions(ref_id) {
        try {
            return await this.request(`/recipes/instructions/${ref_id}`).then((res) => {console.log(res); return res})
        } catch (err) {
            return err
        }
        
    }

    static async addToFave(ref_id) {
        try {
            return await backend.request(`/recipes/${ref_id}/fave`, {},'post').then((res) => res)
        } catch (err) {
            return err
        }
    }

    static async delFave(ref_id) {
        try {
            return await backend.request(`/recipes/${ref_id}`, {}, 'delete').then((res) => res)
        } catch (err) {
            return err
        }
    }

    static async getSuggestions(search) {
        try {
            return await axios({
                url:`${BACKEND_API_URI}/recipes/suggestions`, 
                data: {'item': search},
                method:'POST'
            }).then((res) => {console.log(res.data); return res.data})
        } catch (err) {
            return err
        }
    }
}

export default backend;

