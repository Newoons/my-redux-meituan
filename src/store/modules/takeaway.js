import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
    name: 'foods',
    initialState: {
        //商品列表
        foodsList: [],
        // 菜单激活下标
        activeIndex: 0,
    },
    reducers: {
        // 商品数据
        setFoodsList(state, action) {
            console.log(action.type,'type')
            state.foodsList = action.payload
        },
        // 菜单下标更改
        changeActiveIndex(state,action) {
            state.activeIndex = action.payload
        },
    }
})

// 异步获取部分
const { setFoodsList,changeActiveIndex } = foodsStore.actions
const fetchFoodsList = () => {
    return async (dispatch)=>{
        // 编写异步逻辑
        const res = await axios.get('http://localhost:3004/takeaway')
        console.log(res,'res')
        // 调用dispatch函数提交action
        dispatch(setFoodsList(res.data))
    }
}

export { fetchFoodsList,changeActiveIndex }

const reducer = foodsStore.reducer

export default reducer
