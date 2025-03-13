"use client";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Add, Decrease } from "../../../lib/features/cartSlice";
import { AddedQuantity, Thumbnail, Category, Title, Price } from './SSR_components'

const Decrement = ({id, dispatch})=>    <div onClick={()=>decrement(id, dispatch)} className="minus">
                                            <div className="minus-round">
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>

const Increment = ({id, dispatch})=>    <div onClick={()=>increment(id, dispatch)} className="plus">
                                            <div className="plus-holder">
                                                <div className="line"></div>
                                                <div className="line"></div>
                                            </div>
                                        </div>;

const triggerFillIn = (statusRef)=>{
    const statusIndicator = statusRef ? statusRef.current : null;
    if(statusIndicator){
        statusIndicator.style.animation = 'newlyAdded 0.7s forwards'
    };
};

function ProductActiveStatus({id, dispatch, quantity, last_operation}){
    const statusRef = useRef(null)
    const enlargeAnim = (quantity >= 1) ? 'enlargeAnim' : '';
    const fillInEffect = ((quantity === 1) && (last_operation=='increment')) ? true : false;
    useEffect(()=>{
        if (fillInEffect){triggerFillIn(statusRef)};
    }, []);
    const structure = 
        <div className={`cart-status ${enlargeAnim}`}>
            <div ref={statusRef}  className={`added-status`}>
                <Decrement id={id} dispatch={dispatch}/>
                <AddedQuantity quantity={quantity}/>
                <Increment id={id} dispatch={dispatch}/>
            </div>
        </div>;
    return structure;
};

function ProductDefaultStatus({id, dispatch, quantity, last_operation}){
    const resetEffect = (quantity == 0) && (last_operation=='decrement') ? 'statusRefresh' : '';
    const structure = 
        <div className={`cart-status ${resetEffect}`}>
            <div onClick={()=>increment(id, dispatch)} className="DefaultProductStatus">
                <div className="status1">
                    <img src="/images/icon-add-to-cart.svg" alt="Description of the image"/>
                </div>
                <div className="status2">
                    <p>Add to cart</p>
                </div>
            </div>
        </div>;
    return structure;
};

function increment(id, dispatch){
    dispatch(Add(id))
};

function decrement(id, dispatch){
    dispatch(Decrease(id))
};


function ProductStatus({id, dispatch, quantity, last_operation}){
    return quantity ? <ProductActiveStatus 
        key={id-quantity}
        id={id}
        dispatch={dispatch}
        quantity={quantity}
        last_operation={last_operation}
    /> : <ProductDefaultStatus id={id} dispatch={dispatch} last_operation={last_operation} quantity={quantity}/>
};

function Product({id, image, type, title, price}){
    const productState = useSelector((state) => state.cart.added_products);
    const added_data = productState[id] || {};
    const current_quantity = added_data['quantity'] || 0;
    const last_operation = added_data['last_operation'];
    const dispatch = useDispatch();
    const structure = 
        <div className="product">
            <Thumbnail url={image}/>
            <ProductStatus id={id} dispatch={dispatch} quantity={current_quantity} last_operation={last_operation}/>
            <Category is={type}/>
            <Title is={title}/>
            <Price is={price}/>
        </div>;
    return structure;
};

export default Product;