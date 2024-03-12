import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
    name: 'foods',
    initialState: {
        //商品列表
        foodsList: [],
        // 菜单激活下标
        activeIndex: 0,
        // 购物车列表
        cartList: [],
    },
    reducers: {
        // 商品数据
        setFoodsList(state, action) {
            console.log(action.type, 'type')
            state.foodsList = action.payload
        },
        // 菜单下标更改
        changeActiveIndex(state, action) {
            state.activeIndex = action.payload
        },
        // 添加购物车
        addCart(state, action) {
            // 是否添加过该商品
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count++
            } else {
                state.cartList.push({ ...action.payload, count: 1 })
            }
        },
        // 购物车数量增加
        increCount(state, action) {
            // 找到当前要修改谁的count id
            const i = state.cartList.find(item => item.id === action.payload.id)
            i.count++
        },
        // 购物车数量减少
        decreCount(state, action) {
            // 找到当前要修改谁的count id
            const i = state.cartList.find(item => item.id === action.payload.id)
            i.count--
            if(i.count <= 0) {
                state.cartList = state.cartList.filter(item=>item.id !== action.payload.id)
            }
        },
        // 清空数据列表
        clearList (state,action) {
            state.cartList = []
        },
    }
})

// 异步获取部分
const { setFoodsList, changeActiveIndex, addCart, increCount, decreCount, clearList } = foodsStore.actions
const fetchFoodsList = () => {
    return async (dispatch) => {
        // 编写异步逻辑
        const res = await axios.get('http://localhost:3004/takeaway')
        console.log(res, 'res')
        // 调用dispatch函数提交action
        dispatch(setFoodsList(res.data))
    }
}

export { fetchFoodsList, changeActiveIndex, addCart, increCount, decreCount, clearList }

const reducer = foodsStore.reducer

export default reducer
