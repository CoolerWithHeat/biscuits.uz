"use client"
import ProductsData from '../../../data/serverResponse.json'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Complete_Removal } from "../../../lib/features/cartSlice";
import { Window1, AddedProducts, CartHeader, ProductsList, CartPanel } from './SSR_components'
import '../../../public/css/messages.css';
import '../../../public/css/animations.css';
import '../../../public/css/styles.css';

const server_response = ProductsData;

const project_repo = 'https://github.com/CoolerWithHeat/';


function openURL(url) {
    if (url && typeof url === 'string') {
        setTimeout(() => {
          window.open(url, '_blank');
        }, 599);
    } else {
        console.error('Invalid URL provided');
    }
}

const removePopup = (elementRef) => {
    if (elementRef?.current) {
        elementRef.current.classList.remove("message-request");
        elementRef.current.classList.add("removeSuggestion");
    }
};

function SourceCodePopup(){
    const visitorIneraction = useSelector((state) => state.cart.interaction);
    const [suggestionActive, removeSuggestion] = useState(true);
    const rejectRef = useRef(null)
    const openGitRepo = ()=>{
        removePopup(rejectRef)
        setTimeout(() => {
            openURL(project_repo);
        }, 299);
    };
    return ((visitorIneraction > 3) && (suggestionActive)) ? <div ref={rejectRef} id="SourceSuggestion" className="message-request">
                <div className="message-header">
                <h1 className="headerText">Attention!</h1>
                </div>
                <div className="request">
                <div className="requestHeader">
                    <h4>Want To See Source Code?</h4>
                </div>
                <div className="requestActions">
                    <div onClick={openGitRepo} id="YesPoint" className="Yes">Yes</div>
                    <div onClick={() => removePopup(rejectRef)} id="NoPoint" className="No">No</div>
                </div>
                </div>
            </div>
        :
        <></>
};

function ConfirmButton({enableMessage, action, animate, quantity}){
    const buttonRef = useRef(null);
    useEffect(() => {
        if (buttonRef.current && quantity && animate) {
          buttonRef.current.classList.remove("bubble-button");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              buttonRef.current.classList.add("bubble-button");
            });
          });
          action();
          enableMessage();
        };
      }, [animate]);
    return  <div onClick={action} className="confirmation">
                <div ref={buttonRef} id="ConfirmButton" className={`confirm-button`}>
                <p>Confirm Order</p>
                </div>
            </div>;
}

function PurchaseSuccess({text, removeMessage}){
    useEffect(()=>{
        const timeoutID = setTimeout(() => {
            removeMessage();
        }, 3999);
        return () => clearTimeout(timeoutID);
    }, []);
    return  <div className="message-positive rightSideAppear">
                <div className="message-header">
                <h1 className="headerText">Thank You!</h1>
                </div>
                <div className="message-lifespan"></div>
                <div className="textContainer">
                <p className="message-text">
                    {text}
                </p>
                </div>
            </div>
};

function TotalIndicator() {
    const last = useSelector((state) => state.cart.lastResulted);
    const current = useSelector((state) => state.cart.total);
    const [currentValue, updateValue] = useState(last); 
    useEffect(() => {
        if (currentValue === current) return;
        let step = currentValue < current ? 1 : -1;
        let interval = setInterval(() => {
            updateValue((prev) => {
                let nextValue = prev + step;
                if ((step > 0 && nextValue >= current) || (step < 0 && nextValue <= current)) {
                    clearInterval(interval);
                    return current;
                }
                return nextValue;
            });
        }, 35);
        return () => clearInterval(interval);
    }, [current]);
    return (
        <div className="TotalPrice">
            <p id="Exact-Amount">${currentValue}</p>
        </div>
    );
}

const CompleteRemoval = (id, dispatch)=> {
    dispatch(Complete_Removal(id))
};

function CartProduct({id, title, price, quantity, last_operation, clickAction}){
    const firstTime = (quantity === 1) && (last_operation == 'increment');
    const [modifyEffectClass, setModifyEffectClass] = useState(false);
    const [removeEffect, setRemoveEffect] = useState(false);
    const [removeElement, setRemoveElement] = useState(false);
    const firstTimeAnim = firstTime ? 'animate-card' : '';
    const modifyEffect = modifyEffectClass ? 'cart-update-effect' : '';
    const SlowlyRemove = removeEffect ? 'slowlyRemove' : '';
    useEffect(() => {
        if (!firstTime && quantity) {
            setModifyEffectClass(true);
            const timeout = setTimeout(() => {
                setModifyEffectClass(false);
            }, 399);
            return () => clearTimeout(timeout);
        } else if (quantity === 0){
            setRemoveEffect(true);
            const timout_id = setTimeout(() => {
                setRemoveElement(true);
            }, 449);
            return ()=> clearTimeout(timout_id);
        };
    }, [quantity, firstTime]);
    const cardClassname = `cart-product ${firstTimeAnim} ${modifyEffect} ${SlowlyRemove}`;
    return !removeElement ? (    
        <>
            <div id={`cart-product-${id}`} className={`cart-product ${cardClassname}`}>
                <div className="cart-product-child1">
                    <small>{title}</small>
                </div>
                <div className="cart-product-child2">
                    <p className="x-amount globaltext">{quantity}x</p>
                </div>
                <div className="cart-product-child3">
                    <p className="price1 globaltext">@ ${parseFloat(price).toFixed(2)}</p>
                </div>
                <div className="cart-product-child4">
                    <p className="price2 globaltext">${parseFloat(price * quantity).toFixed(2)}</p>
                </div>
                <div onClick={clickAction} className="cart-product-child5">
                    <img src="/images/icon-remove-item.svg"/>
                </div>
            </div>
        </>
    ) : null;
};

function FilterExisting(dataset){
    if(dataset){
      const filteredData = Object.keys(dataset).filter(each=>{return dataset[each].quantity});
      return filteredData;
    }  
    return [];
};

function WrapCartProducts(data, dispatch, productState){
    const processed = data.map(each_id=>{
        const product = server_response[each_id];
        const product_data = productState[each_id] || {};
        const product_quantity = product_data['quantity'] || 0;
        const last_operation = product_data['last_operation'];
        const isObject = typeof product == 'object';
        if (isObject) {
            return (
                <CartProduct
                    key={`${each_id}-${product_quantity}`}
                    id={each_id}
                    title={product.title}
                    price={product.price}
                    quantity={product_quantity}
                    last_operation={last_operation}
                    clickAction={()=>CompleteRemoval(each_id, dispatch)}
                />
            );
        };
    });
    return processed;
};

function Window2({toggleState, updateToggle, enableMessage}){
    const productState = useSelector((state) => state.cart.added_products);
    const keys = Object.keys((productState || {}));
    const [messageState, updateMessage] = useState(false);
    const dispatch = useDispatch();
    const products_count = FilterExisting(productState).length;
    const processedCartProducts = WrapCartProducts(keys, dispatch, productState);
    useEffect(() => {
        const handleResize = () => {
            const currentWidth = window.innerWidth;
            const onDesktop = currentWidth > 659;
            if(onDesktop && !toggleState){updateToggle(true)};
        };
        window.addEventListener("resize", handleResize);
        return ()=> window.removeEventListener('resize', handleResize)
    }, [toggleState]);
    const structure = 
        <div className="window2">
            <div id="mobileCart" className={`Cart-Total mobileCart ${!toggleState ? 'closeMobileCart' : ''}`}>
                <CartHeader quantity={products_count}/>
                <AddedProducts products={processedCartProducts}/>
                <CartPanel TotalIndicator={TotalIndicator}/>
                <ConfirmButton enableMessage={enableMessage} action={()=>updateMessage(!messageState)} animate={messageState} quantity={products_count}/>
            </div>
        </div>;
    return structure;
};

function MobileToggle({toggleState, updateToggle}){
    return  <div onClick={()=>updateToggle(!toggleState)} id="togglePoint" className={`menu-button ${toggleState ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>;
};

function Main_interface(){
    const [messageOn, updateMessage] = useState(false);
    const [toggled, updateToggle] = useState(true)
    const toggleCartMobile = ()=>updateToggle(!toggled);
    const disableMessage = ()=> updateMessage(false);
    const enableMessage = ()=> updateMessage(true);
    const view_structure = 
        <>
            <div className="container">
                <Window1/>
                <MobileToggle toggleState={toggled} updateToggle={toggleCartMobile}/>
                <Window2 toggleState={toggled} updateToggle={toggleCartMobile} enableMessage={enableMessage}/>
                <ProductsList products={server_response}/>
            </div>
            <div id="SuggestionWindow"></div>
            <div id="MessageWindow">
                {messageOn ? <PurchaseSuccess 
                                removeMessage={disableMessage} 
                                text={"We're truly grateful for your support and trust in our products."}
                             /> : ''}
                <SourceCodePopup/>
            </div>
        </>;
    return view_structure;
};

export default Main_interface;